import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// ✅ Use service role key for database writes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ Signature verification
function verifySignature(body, signature, secret) {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (
      !verifySignature(body, signature, process.env.RAZORPAY_WEBHOOK_SECRET)
    ) {
      console.warn("❌ Invalid Razorpay signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const event = JSON.parse(body);
    console.log("📬 Event received:", event.event);

    if (event.event === "payment.captured") {
      console.log("💰 Payment captured event");
      const payment = event.payload.payment.entity;
      const { userId, courseId } = payment.notes || {};

      if (!userId || !courseId) {
        console.error("⚠️ Missing userId or courseId in payment notes");
        return NextResponse.json(
          { error: "Missing userId or courseId" },
          { status: 400 }
        );
      }

      // ✅ Prevent duplicate entries
      const { data: existing } = await supabase
        .from("purchases")
        .select("id")
        .eq("razorpay_payment_id", payment.id)
        .maybeSingle();
      if (existing) {
        console.log("🔁 Duplicate payment, skipping insert");
        return NextResponse.json({
          success: true,
          message: "Already processed",
        });
      }

      // ✅ Insert purchase record
      const { error: insertError } = await supabase.from("purchases").insert({
        user_id: userId,
        course_id: courseId,
        razorpay_payment_id: payment.id,
        amount: payment.amount, // store as integer (paise)
        email: payment.email || null,
      });

      const { error: metadataError } = await supabase.auth.admin.updateUserById(
        userId,
        {
          user_metadata: { payment_status: "completed" },
        }
      );
      if (metadataError) {
        console.error("❌ Metadata update failed:", metadataError);
        throw metadataError;
      }

      if (insertError) {
        console.error("❌ Insert error:", insertError);
        throw insertError;
      }
      const { data: updateData, error: updateError } =
        await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { payment_status: "completed" },
        });

      if (updateError) {
        console.error("❌ Failed to update user metadata:", updateError);
      } else {
        console.log("✅ User metadata updated:", updateData);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❗ Webhook error:", error);
    return NextResponse.json(
      { error: "Processing failed", details: error.message },
      { status: 500 }
    );
  }
}
