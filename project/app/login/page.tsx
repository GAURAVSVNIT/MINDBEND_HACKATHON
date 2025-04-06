'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock database of registered mobile numbers
const registeredNumbers = [
  { phone: '1234567890', name: 'John Doe' },
  { phone: '9876543210', name: 'Jane Smith' },
  { phone: '5551234567', name: 'Alex Johnson' },
];

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = () => {
    // Remove all non-digit characters
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    // Check if phone number exists in database
    const user = registeredNumbers.find(user => user.phone === cleanPhone);

    if (user) {
      // Successful login
      sessionStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    } else {
      setError('Phone number not registered');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mobile Sign In</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              +1
            </span>
            <input
              type="tel"
              placeholder="Enter your 10-digit phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError('');
              }}
              className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              maxLength={10}
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <button
          onClick={handleSignIn}
          disabled={phoneNumber.length < 10}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            phoneNumber.length < 10 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Sign In
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;