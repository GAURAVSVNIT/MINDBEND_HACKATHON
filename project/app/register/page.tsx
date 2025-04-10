'use client';

import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { UserPlus, Mail, Phone, User, AlertCircle } from 'lucide-react';
import { auth } from '@/utils/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from 'next/navigation';


interface FormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
  }
  
  export default function SignUpPage() {
    const [formData, setFormData] = useState<FormData>({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          handleSendOtp();
        }
      });
  
      return () => {
        if (recaptchaVerifier.current) {
          recaptchaVerifier.current.clear();
        }
      };
    }, []);
  
    const handleSendOtp = async (e?: FormEvent) => {
      e?.preventDefault();
      
      if (!formData.phone) {
        setError('Phone number is required');
        return;
      }
  
      setLoading(true);
      setError('');
  
      try {
        const formattedPhoneNumber = `+${formData.phone.replace(/\D/g, '')}`;
        
        if (!recaptchaVerifier.current) {
          throw new Error('Recaptcha verifier not initialized');
        }
  
        await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier.current);
        
        // Redirect to OTP verification page with user data
        router.push(`/verify-otp?${new URLSearchParams({
          ...formData,
          phone: formattedPhoneNumber
        }).toString()}`);
  
      } catch (error: any) {
        console.error("Error sending OTP:", error);
        setError(error.message || 'Failed to send OTP');
        
        if (recaptchaVerifier.current) {
          recaptchaVerifier.current.clear();
          recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': () => handleSendOtp()
          });
        }
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&q=80')`,
      }}>
        <div className="max-w-md w-full space-y-8 backdrop-blur-sm bg-black/30 p-8 rounded-xl shadow-2xl border border-gray-700">
          <div>
            <div className="flex justify-center">
              <UserPlus className="h-12 w-12 text-blue-400" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Crime Tracker Registration
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              Join our network of crime prevention specialists
            </p>
          </div>
  
          <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
            <div id="recaptcha-container"></div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="pl-10 block w-full rounded-md border-gray-700 bg-gray-900/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="pl-10 block w-full rounded-md border-gray-700 bg-gray-900/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
  
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10 block w-full rounded-md border-gray-700 bg-gray-900/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 block w-full rounded-md border-gray-700 bg-gray-900/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                  Phone Number (with country code)
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="pl-10 block w-full rounded-md border-gray-700 bg-gray-900/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="+15551234567"
                    value={formData.phone}
                    onChange={handleChange}
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
  
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send Verification Code'}
            </button>
          </form>
        </div>
      </div>
    );
  }