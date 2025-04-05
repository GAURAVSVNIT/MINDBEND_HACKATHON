import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Shield } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crime Trackers - India\'s Premier Crime Reporting Platform',
  description: 'Report and track crimes safely and securely through India\'s leading crime reporting platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-[#1e3a8a] text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="font-bold text-xl">Crime Trackers</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-gray-200">Home</Link>
              <Link href="/report" className="hover:text-gray-200">Report Crime</Link>
              <Link href="/map" className="hover:text-gray-200">Crime Map</Link>
              <Link href="/community" className="hover:text-gray-200">community</Link>
              <Link href="/contacts" className="hover:text-gray-200">Emergency Contacts</Link>
              <Link href="/login" className="bg-white text-[#1e3a8a] px-4 py-2 rounded-md hover:bg-gray-100">
                Login / Sign Up
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-[#1f2937] text-gray-300">
          <div className="max-w-7xl mx-auto py-12 px-4">
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-6 w-6" />
                  <span className="font-bold text-xl text-white">Crime Trackers</span>
                </div>
                <p className="text-sm mb-4">
                  India&#39;s premier crime reporting platform. Empowering communities with real-time incident tracking, advanced analytics, and collaborative safety solutions.
                </p>
                <div className="flex space-x-4">
                  <Link href="#" className="hover:text-white">Twitter</Link>
                  <Link href="#" className="hover:text-white">Facebook</Link>
                  <Link href="#" className="hover:text-white">Instagram</Link>
                  <Link href="#" className="hover:text-white">LinkedIn</Link>
                  <Link href="#" className="hover:text-white">GitHub</Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/" className="block hover:text-white">Home</Link>
                  <Link href="/topics" className="block hover:text-white">Topics</Link>
                  <Link href="/features" className="block hover:text-white">Features</Link>
                  <Link href="/pricing" className="block hover:text-white">Pricing</Link>
                  <Link href="/about" className="block hover:text-white">About Us</Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Resources</h3>
                <div className="space-y-2">
                  <Link href="/blog" className="block hover:text-white">Blog</Link>
                  <Link href="/docs" className="block hover:text-white">Documentation</Link>
                  <Link href="/tutorials" className="block hover:text-white">Tutorials</Link>
                  <Link href="/community" className="block hover:text-white">Community</Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Our Team</h3>
                <div className="space-y-2">
                  <p>Rushang - Lead Developer</p>
                  <p>Sneha - Frontend Specialist</p>
                  <p>Gaurav - Backend Engineer</p>
                  <p>Param - Security Expert</p>
                  <p className="mt-4">info@crimetrackers.com</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <div className="flex justify-between items-center">
                <p>© 2024 Crime Trackers. All rights reserved.</p>
                <div className="flex space-x-6">
                  <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                  <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}