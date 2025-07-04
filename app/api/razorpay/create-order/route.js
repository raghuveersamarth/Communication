import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { courseId, amount, email, username, password } = await req.json();

    // Validate input
    if (!courseId || !amount || !email || !username || !password) {
      return NextResponse.json(
        { error: "Missing required fields (courseId, amount, email, username)" },
        { status: 400 }
      );
    } else if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Generate a temporary password (do NOT send raw passwords)
    const tempPassword = Math.random().toString(36).slice(-8);

    const receiptId = `${courseId}-${Date.now()}`;
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receiptId,
      notes: {
        courseId: String(courseId),
        email: email,
        password: password, // Use temp password
        username: username,
        receipt: receiptId,
      },
      payment_capture: 1,
    });

    return NextResponse.json({
      orderId: order.id,
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    const errorMessage =
      error.error?.description || error.message || "Payment processing failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: error.statusCode || 500 }
    );
  }
}