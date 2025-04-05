"use client";

import { Phone, UserCircle, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function EmergencyContacts() {
  return (
   <>
    <div className="m-[100px]  grid md:grid-cols-2 gap-8">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-semibold">National Emergency Numbers</h2>
        </div>
        <p className="text-gray-600 mb-6">Important contact numbers for emergencies</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 items-center py-2 border-b">
            <span className="font-medium">Police</span>
            <a href="tel:100" className="text-blue-600 hover:text-blue-800">100</a>
          </div>
          <div className="grid grid-cols-2 items-center py-2 border-b">
            <span className="font-medium">Fire Department</span>
            <a href="tel:101" className="text-blue-600 hover:text-blue-800">101</a>
          </div>
          <div className="grid grid-cols-2 items-center py-2 border-b">
            <span className="font-medium">Ambulance</span>
            <a href="tel:102" className="text-blue-600 hover:text-blue-800">102</a>
          </div>
          <div className="grid grid-cols-2 items-center py-2 border-b">
            <span className="font-medium">Women Helpline</span>
            <a href="tel:1091" className="text-blue-600 hover:text-blue-800">1091</a>
          </div>
          <div className="grid grid-cols-2 items-center py-2 border-b">
            <span className="font-medium">Disaster Management</span>
            <a href="tel:108" className="text-blue-600 hover:text-blue-800">108</a>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserCircle className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Personal Emergency Contacts</h2>
        </div>
        <p className="text-gray-600 mb-6">Add your personal emergency contacts for quick access</p>

        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">No personal contacts added yet.</p>
          <button className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100">
            <Plus className="h-5 w-5" />
            Add Personal Contact
          </button>
        </div>
      </Card>
    </div>
   </>
  );
}