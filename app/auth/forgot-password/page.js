'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [step, setStep] = useState(1) // 1: phone, 2: otp+password
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [canResend, setCanResend] = useState(true)
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  // Countdown effect for resend button
  useEffect(() => {
    let interval = null
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0 && !canResend) {
      setCanResend(true)
    }
    return () => clearInterval(interval)
  }, [countdown, canResend])

  // Format phone number
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '')
    
    // Add country code if not present
    if (cleaned.length > 0 && !cleaned.startsWith('1')) {
      return '+1' + cleaned
    } else if (cleaned.length > 0) {
      return '+' + cleaned
    }
    return value
  }

  const sendOTP = async (e) => {
    e.preventDefault()
    
    if (!canResend && step === 1) {
      setError(`Please wait ${countdown} seconds before resending`)
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const formattedPhone = formatPhoneNumber(phone)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          shouldCreateUser: false // Don't create new user, only reset existing
        }
      })

      if (error) {
        if (error.message.includes('User not found')) {
          setError('No account found with this phone number')
        } else if (error.message.includes('rate limit')) {
          setError('Too many requests. Please wait before trying again.')
        } else {
          setError(error.message)
        }
      } else {
        setMessage('OTP sent to your phone!')
        setStep(2)
        setCanResend(false)
        setCountdown(60) // 60 second cooldown
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resendOTP = async () => {
    if (!canResend) return
    
    setLoading(true)
    setError('')
    
    const formattedPhone = formatPhoneNumber(phone)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          shouldCreateUser: false
        }
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('New OTP sent!')
        setCanResend(false)
        setCountdown(60)
      }
    } catch (err) {
      setError('Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyOTPAndResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    const formattedPhone = formatPhoneNumber(phone)

    try {
      // Verify OTP and sign in
      const { error: verifyError } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms'
      })

      if (verifyError) {
        if (verifyError.message.includes('Invalid token')) {
          setError('Invalid or expired OTP. Please try again.')
        } else {
          setError(verifyError.message)
        }
        setLoading(false)
        return
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        setError(updateError.message)
      } else {
        setMessage('Password updated successfully!')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Step 1: Enter phone number
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-500">
              Reset Password via SMS
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your phone number to receive an OTP
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={sendOTP}>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Phone number (e.g., +1234567890)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="mt-1 text-xs text-white">
                Include country code (e.g., +1 for US/Canada)
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            {message && (
              <div className="text-green-600 text-sm text-center">{message}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || !canResend}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 
                 !canResend ? `Wait ${countdown}s` : 
                 'Send OTP'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push('dashboard/login')}
                className="text-amber-600 hover:text-amber-500"
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Step 2: Enter OTP and new password
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter OTP and New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Check your phone for the verification code
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={verifyOTPAndResetPassword}>
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="sr-only">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength="6"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center text-lg tracking-widest"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="sr-only">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {message && (
            <div className="text-green-600 text-sm text-center">{message}</div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Reset Password'}
            </button>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-gray-600 hover:text-gray-500"
              >
                Change phone number
              </button>
              
              <button
                type="button"
                onClick={resendOTP}
                disabled={!canResend || loading}
                className="text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
              >
                {!canResend ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
