'use client';
import Script from 'next/script';

export default function CheckoutButton({ course, disabled }) {
  const handlePayment = async () => {
    // 1. Create Razorpay order
    const res = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        courseId: course.id, 
        amount: course.price 
      })
    });
    const { orderId } = await res.json();

    // 2. Open Razorpay modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: course.price * 100,
      order_id: orderId,
      name: course.title,
      handler: () => window.location.reload() // Refresh to update access
    };
    new window.Razorpay(options).open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button disabled={disabled} className='border text-center border-amber-500 text-white px-8 py-2 rounded-lg hover:bg-amber-600 cursor-pointer transition-colors font-medium disabled:bg-gray-400 disabled:border-none' onClick={handlePayment}>Pay ₹{course.price}</button>
    </>
  );
}