import { Shield, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h1 className="text-5xl font-bold mb-6">Report Crimes Safely and Securely</h1>
              <p className="text-xl mb-8">
                Help build safer communities by reporting incidents through India's premier crime reporting platform.
              </p>
              <div className="flex space-x-4">
                <Button asChild className="bg-white text-[#1e3a8a] hover:bg-gray-100">
                  <Link href="/report">Report a Crime</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-[#1e3a8a] font-semibold mb-4">Report Summary</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-1">Location</label>
                  <input type="text" className="w-full p-2 border rounded" disabled placeholder="Enter location" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Date & Time</label>
                  <input type="text" className="w-full p-2 border rounded" disabled placeholder="Select date and time" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Status</label>
                  <div className="flex items-center space-x-2 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>Report Received</span>
                  </div>
                </div>
                <Button className="w-full bg-[#1e3a8a]">View Details</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How Crime Trackers Works</h2>
          <p className="text-center text-gray-600 mb-12">
            Our platform makes crime reporting simple, secure, and effective for communities across India.
          </p>
          <div className="grid grid-cols-3 gap-8">
            <Card className="p-6">
              <FileText className="w-12 h-12 text-[#1e3a8a] mb-4" />
              <h3 className="text-xl font-semibold mb-2">File a Report</h3>
              <p className="text-gray-600">
                Fill out our comprehensive yet simple reporting form with incident details, location, and optional evidence.
              </p>
            </Card>
            <Card className="p-6">
              <Clock className="w-12 h-12 text-[#1e3a8a] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rapid Response</h3>
              <p className="text-gray-600">
                Reports are quickly routed to the appropriate authorities and you'll receive a case reference number.
              </p>
            </Card>
            <Card className="p-6">
              <Shield className="w-12 h-12 text-[#1e3a8a] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor the status of your report and receive updates as the situation is addressed by authorities.
              </p>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button asChild className="bg-[#1e3a8a]">
              <Link href="/report">Report an Incident Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Making Communities Safer Together</h2>
              <p className="text-gray-600 mb-8">
                Since our inception, Crime Trackers has helped thousands of citizens report crimes and worked with local authorities to resolve issues quickly and efficiently.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#1e3a8a]" />
                  <span>Connecting citizens directly with law enforcement agencies</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#1e3a8a]" />
                  <span>Providing anonymous reporting options for sensitive situations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#1e3a8a]" />
                  <span>Creating a data-driven approach to community safety</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl font-bold text-[#1e3a8a] mb-2">10,000+</div>
                <div className="text-gray-600">Reports Filed</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl font-bold text-[#1e3a8a] mb-2">85%</div>
                <div className="text-gray-600">Resolution Rate</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl font-bold text-[#1e3a8a] mb-2">200+</div>
                <div className="text-gray-600">Communities</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl font-bold text-[#1e3a8a] mb-2">30+</div>
                <div className="text-gray-600">Police Stations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Be Part of a Safer Community</h2>
          <p className="text-xl mb-8">
            Every report contributes to making our neighborhoods safer for everyone.<br />
            Your vigilance matters.
          </p>
          <Button asChild className="bg-white text-[#1e3a8a] hover:bg-gray-100">
            <Link href="/report">Report a Crime Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}