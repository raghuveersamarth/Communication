'use client'
import { useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'
import RevealOnScroll from '@/components/RevealOnScroll'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
})

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br px-4 sm:px-6 lg:px-8">
      <RevealOnScroll delay={0.5}>
        <form
          className={`flex flex-col items-center justify-center bg-[#121212] rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md ${inter.className}`}
          onSubmit={async (e) => {
            e.preventDefault()
            setError('')
            setMessage('')

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/auth/reset`
            })

            if (error) {
              setError(error.message)
              alert(error.message)
              console.log(error);
              
            } else {
              setMessage('Check your email for the password reset link.')
              setTimeout(() => {
                router.push('/dashboard/Login')
              }, 3000)
            }
          }}
        >
          <h1 className="font-bold text-2xl sm:text-3xl text-amber-400 mb-6 text-center">Reset Your Password</h1>
          <input
            type="email"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 mb-4 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition text-sm sm:text-base"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition mb-2 text-sm sm:text-base"
          >
            Send Reset Link
          </button>
          {message && <p className="text-green-400 mt-4 text-center text-sm sm:text-base">{message}</p>}
          {error && <p className="text-red-400 mt-2 text-center text-sm sm:text-base">{error}</p>}
        </form>
      </RevealOnScroll>
    </div>
  )
}
