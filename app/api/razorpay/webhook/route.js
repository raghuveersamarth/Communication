import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    if (!verifySignature(body, signature, process.env.RAZORPAY_WEBHOOK_SECRET)) {
      console.error("❌ Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const event = JSON.parse(body);
    console.log("📬 Event received:", event.event);

    if (event.event !== "payment.captured") {
      console.log("🟡 Ignoring non-payment event");
      return NextResponse.json({ success: true });
    }

    const payment = event.payload.payment.entity;
    const { username, courseId, email, password } = payment.notes || {};

    if (!courseId || !email || !username || !password) {
      console.error("❌ Missing required fields in notes");
      return NextResponse.json(
        { error: "Missing required fields in notes" },
        { status: 400 }
      );
    }

    console.log("Extracted notes:", { username, courseId, email });

    // ✅ Check for duplicate payment first
    const { data: existing } = await supabase
      .from("purchases")
      .select("id, user_id")
      .eq("razorpay_payment_id", payment.id)
      .maybeSingle();

    if (existing) {
      console.log("🔁 Duplicate payment, skipping insert");
      return NextResponse.json({
        success: true,
        message: "Already processed",
      });
    }

    // ✅ Create user
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: {
        payment_status: "pending",
        username: username,
      },
      email_confirm: true, // Auto-confirm the user
    });

    if (userError) {
      console.error("❌ Failed to create user:", userError.message);
      throw userError;
    }

    const userId = userData.user.id;
    console.log("✅ User created with ID:", userId);

    // ✅ Insert purchase
    const { error: insertError } = await supabase.from("purchases").insert({
      user_id: userId,
      course_id: courseId,
      razorpay_payment_id: payment.id,
      amount: payment.amount,
      email: payment.email || email,
    });

    if (insertError) {
      console.error("❌ Insert error:", insertError);
      throw insertError;
    }

    // ✅ Update metadata
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { payment_status: "completed" },
    });

    if (updateError) {
      console.error("❌ Metadata update failed:", updateError);
      throw updateError;
    }
          // 2. Generate magic link
      const { data: link, error: linkError } = 
        await supabase.auth.admin.generateLink({
          type: "magiclink",
          email: email,
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`
          }
        });


    console.log("✅ Payment recorded for user:", userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❗ Webhook error:", error);
    return NextResponse.json(
      { error: "Processing failed", details: error.message },
      { status: 500 }
    );
  }
}