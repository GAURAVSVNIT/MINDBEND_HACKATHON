"use client";

import { useState } from 'react';
import { MapPin, MessageSquare, Shield, AlertTriangle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CommunityPage() {
  const [selectedArea, setSelectedArea] = useState('');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Community Safety Hub</h1>
            <p className="text-blue-600 max-w-2xl mx-auto">
              Stay informed about your neighborhood and connect with your community to create a safer environment.
            </p>
          </header>

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="map" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Area Safety Map
              </TabsTrigger>
              <TabsTrigger value="discussions" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Community Discussions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-4">
              <Card className="p-6">
                <div className="mb-4">
                  <Input 
                    placeholder="Search for an area..." 
                    className="max-w-md"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                  />
                </div>
                <div className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                  {/* Google Maps will be integrated here */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1659012345678!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 border-l-4 border-green-500">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      Safety Score
                    </h3>
                    <p className="text-2xl font-bold text-green-500">8.5/10</p>
                  </Card>
                  
                  <Card className="p-4 border-l-4 border-blue-500">
                    <h3 className="font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-blue-500" />
                      Recent Incidents
                    </h3>
                    <p className="text-2xl font-bold text-blue-500">12</p>
                  </Card>

                  <Card className="p-4 border-l-4 border-purple-500">
                    <h3 className="font-semibold flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-500" />
                      Community Reports
                    </h3>
                    <p className="text-2xl font-bold text-purple-500">45</p>
                  </Card>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="discussions" className="space-y-4">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-900">Community Discussions</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Start New Discussion
                  </Button>
                </div>

                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Card key={i} className="p-4 hover:bg-blue-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-blue-900">
                            Increased Patrol Request - Downtown Area
                          </h3>
                          <span className="text-sm text-blue-600">2 hours ago</span>
                        </div>
                        <p className="text-gray-600 mb-3">
                          We&apos;ve noticed an increase in suspicious activity around the central park area. 
                          Requesting additional police patrols during evening hours.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-blue-600">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" /> 23 replies
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> Downtown
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}