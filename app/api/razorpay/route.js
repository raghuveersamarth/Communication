import Razorpay from "razorpay";

export async function POST(request) {

    const body = await request.json();
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return new Response("Razorpay credentials are not set", { status: 500 });
    }
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}