'use client';

import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { Phone, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { auth } from '@/utils/firebase';
import { ConfirmationResult, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useRouter, useSearchParams } from 'next/navigation';

export default function OtpVerificationPage() {
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const confirmationResult = useRef<ConfirmationResult | null>(null);
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
  const router = useRouter();

  const phone = searchParams?.get('phone') || '';
  const firstName = searchParams?.get('firstName') || '';
  const lastName = searchParams?.get('lastName') || '';
  const username = searchParams?.get('username') || '';
  const email = searchParams?.get('email') || '';

  useEffect(() => {
    // Initialize reCAPTCHA
    recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
    });

    // Resend OTP if not already sent
    if (!confirmationResult.current && phone) {
      handleResendOtp();
    }

    return () => {
      if (recaptchaVerifier.current) {
        recaptchaVerifier.current.clear();
      }
    };
  }, [phone]);

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (!recaptchaVerifier.current) {
        throw new Error('Recaptcha verifier not initialized');
      }

      const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifier.current);
      confirmationResult.current = result;
      setMessage('New OTP sent successfully!');
    } catch (error: any) {
      console.error("Error resending OTP:", error);
      setError(error.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    if (!confirmationResult.current) {
      setError('No verification in progress. Please resend OTP.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await confirmationResult.current.confirm(otp);
      const user = result.user;
      
      // Here you would typically send the user data to your backend
      // along with the Firebase UID to complete registration
      console.log('User verified:', {
        uid: user.uid,
        phone: user.phoneNumber,
        firstName,
        lastName,
        username,
        email
      });

      setVerificationSuccess(true);
      setMessage('Verification successful! Redirecting...');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      setError(error.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&q=80')`,
    }}>
      <div className="max-w-md w-full space-y-8 backdrop-blur-sm bg-black/30 p-8 rounded-xl shadow-2xl border border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Verify Your Phone
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Enter the 6-digit code sent to {phone}
          </p>
        </div>

        {!verificationSuccess ? (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
            <div id="recaptcha-container"></div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                  Verification Code
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    className="pl-10 block w-full rounded-md border-gray-700 bg-gray-900/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {message && (
              <div className="flex items-center space-x-2 text-green-400">
                <span className="text-sm">{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              className="w-full text-center text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50"
            >
              Resend OTP
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full flex items-center justify-center text-sm text-gray-400 hover:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Change Phone Number
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 text-lg font-medium text-white">Verification Successful!</h3>
            <div className="mt-2 text-sm text-gray-300">
              <p>Redirecting you to your dashboard...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}