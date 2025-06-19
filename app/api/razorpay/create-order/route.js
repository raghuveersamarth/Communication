import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(req) {
  const { courseId, userId, amount } = await req.json();

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${courseId}_${Date.now()}`,
      notes: { courseId, userId } // Custom metadata
    });

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}