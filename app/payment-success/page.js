// app/payment-success/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const verifySessionAndPayment = async () => {
      try {
        setStatus('checking');
        setMessage('Verifying your payment...');

        // 1. Check for payment_id parameter
        const paymentId = searchParams.get('payment_id');
        if (!paymentId) {
          throw new Error('Missing payment reference');
        }

        // 2. Force session refresh
        const { data: { session }, error: sessionError } = 
          await supabase.auth.getSession();
        
        if (sessionError || !session?.user) {
          setMessage('Please login to access your purchase');
          setStatus('unauthenticated');
          return;
        }

        // 3. Verify purchase exists and belongs to this user
        const { data: purchase, error: purchaseError } = await supabase
          .from('purchases')
          .select('user_id, status')
          .eq('razorpay_payment_id', paymentId)
          .single();

        if (purchaseError || !purchase) {
          throw new Error('Payment record not found');
        }

        if (purchase.user_id !== session.user.id) {
          setMessage('This payment does not belong to your account');
          setStatus('unauthorized');
          return;
        }

        // 4. Check payment status
        if (purchase.status !== 'completed') {
          setMessage(`Payment status: ${purchase.status}`);
          setStatus('pending');
          return;
        }

        // 5. Refresh user session
        await supabase.auth.refreshSession();
        
        setMessage('Payment successfully verified!');
        setStatus('success');

      } catch (error) {
        console.error('Verification error:', error);
        setMessage(error.message || 'Payment verification failed');
        setStatus('error');
      }
    };

    verifySessionAndPayment();
  }, [router, searchParams, supabase.auth]);

  const handleRedirect = () => {
    router.push('/dashboard/learning');
  };

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        {status === 'checking' && (
          <>
            <div className="text-4xl">🔍</div>
            <p className="text-lg">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-4xl">✅</div>
            <h1 className="text-2xl font-bold">Payment Verified!</h1>
            <p className="text-muted-foreground">{message}</p>
            <button 
              onClick={handleRedirect} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Start Learning →
            </button>
          </>
        )}

        {(status === 'unauthenticated' || status === 'unauthorized') && (
          <>
            <div className="text-4xl">🔒</div>
            <h1 className="text-xl font-bold">Access Required</h1>
            <p className="text-muted-foreground mb-4">{message}</p>
            <button 
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-4xl">❌</div>
            <h1 className="text-xl font-bold">Verification Failed</h1>
            <p className="text-muted-foreground mb-4">{message}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => router.push('/')}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Home
              </button>
              <button 
                onClick={() => router.push('/support')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Contact Support
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}