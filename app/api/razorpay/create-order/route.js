import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(req) {
  try {
    const { courseId, userId, amount } = await req.json();

    // Validate input
    if (!courseId || !userId || !amount) {
      return NextResponse.json(
        { error: 'Missing courseId, userId, or amount' },
        { status: 400 }
      );
    }

    // Convert IDs to strings to ensure slice() works
    const courseStr = String(courseId);
    const userStr = String(userId);

    // Generate receipt ID (max 40 chars)
    const receiptId = `crse-${courseStr.slice(0, 5)}-usr-${userStr.slice(0, 8)}-${Date.now().toString().slice(-6)}`;

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: receiptId,
      notes: { 
        courseId: courseStr,
        userId: userStr
      },
      payment_capture: 1
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    console.error('Razorpay error:', error);
    
    // Improved error handling
    const errorMessage = error.error?.description 
      || error.message 
      || 'Payment processing failed';

    return NextResponse.json(
      { error: errorMessage },
      { status: error.statusCode || 500 }
    );
  }
}