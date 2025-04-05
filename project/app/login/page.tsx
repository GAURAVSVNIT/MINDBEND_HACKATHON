'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, KeyRound, User } from 'lucide-react';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-12 h-12 text-blue-600" />
            <h1 className="text-3xl font-bold ml-3 text-gray-800">Crime Trackers</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your user ID"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
              Forgot password? Click here
            </a>
            <br/>
            <a href="/signup" className="text-blue-600 hover:text-blue-800 text-sm">
              Create Account
            </a>
          </div>

          <button
            className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold">SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
}