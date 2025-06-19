import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { supabase } from '@/lib/supabase';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('x-razorpay-signature');

  // 1. Verify webhook signature
  const isValid = razorpay.utility.verifyWebhookSignature(
    body,
    signature,
    process.env.RAZORPAY_WEBHOOK_SECRET
  );
  if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });

  // 2. Handle payment event
  const event = JSON.parse(body);
  if (event.event === 'payment.captured') {
    const { payment, order } = event.payload.payment.entity;
    
    // 3. Save to Supabase
    const { error } = await supabase.from('purchases').insert({
      user_id: order.notes.userId, // From create-order
      course_id: order.notes.courseId,
      razorpay_payment_id: payment.id,
      amount: payment.amount / 100, // Convert paise to ₹
    });

    if (error) console.error('Supabase insert error:', error);
  }

  return NextResponse.json({ success: true });
}