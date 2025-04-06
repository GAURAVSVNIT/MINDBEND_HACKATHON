// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useSocket } from '@/context/SocketContext';
// import { CrimeReport, Location } from '@/types/crime';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for Leaflet marker icons
// // Need to manually set the icon paths due to how Next.js handles assets
// const icon = L.icon({
//   iconUrl: '/marker-icon.png',
//   shadowUrl: '/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// // This component handles map click events and updates parent component
// const LocationMarker = ({ position, setPosition }: {
//   position: [number, number] | null;
//   setPosition: (pos: [number, number]) => void;
// }) => {
//   const map = useMapEvents({
//     click(e) {
//       setPosition([e.latlng.lat, e.latlng.lng]);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return position ? <Marker position={position} icon={icon} /> : null;
// };

// const CrimeReportForm: React.FC = () => {
//   const { socket, isConnected } = useSocket();
//   const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
//   const [location, setLocation] = useState<Location | null>(null);
//   const [type, setType] = useState<CrimeReport['type']>('theft');
//   const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [address, setAddress] = useState<string>('');

//   // Get user's current position
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setMarkerPosition([latitude, longitude]);
//         setLocation({
//           lat: latitude,
//           lng: longitude
//         });
//         setMapLoaded(true);
//         getAddressFromCoordinates(latitude, longitude);
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//         // Default coordinates (New York City)
//         setMarkerPosition([40.7128, -74.006]);
//         setLocation({
//           lat: 40.7128,
//           lng: -74.006
//         });
//         setMapLoaded(true);
//         getAddressFromCoordinates(40.7128, -74.006);
//       }
//     );
//   }, []);

//   // Update location when marker position changes
//   useEffect(() => {
//     if (markerPosition) {
//       setLocation({
//         lat: markerPosition[0],
//         lng: markerPosition[1]
//       });
//       getAddressFromCoordinates(markerPosition[0], markerPosition[1]);
//     }
//   }, [markerPosition]);

//   // Function to get address from coordinates using OpenStreetMap Nominatim API
//   const getAddressFromCoordinates = async (lat: number, lng: number) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
//       );
//       const data = await response.json();
      
//       if (data && data.display_name) {
//         setAddress(data.display_name);
//         setLocation((prev: Location | null) => prev ? {
//           ...prev,
//           address: data.display_name
//         } : null);
//       }
//     } catch (error) {
//       console.error('Error getting address:', error);
//     }
//   };

//   // Handle photo upload
//   const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       const selectedFile = files[0];
//       setPhoto(selectedFile);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPhotoPreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
    
//     if (!location) {
//       alert('Please select a location on the map.');
//       return;
//     }
    
//     if (!isConnected) {
//       alert('Not connected to server. Please try again.');
//       return;
//     }
    
//     setSubmitting(true);
    
//     try {
//       // Upload photo if exists
//       let photoUrl = '';
//       if (photo) {
//         // In a real app, you'd upload to a storage service
//         // For this example, we'll use base64 (not recommended for production)
//         const reader = new FileReader();
//         photoUrl = await new Promise((resolve) => {
//           reader.onload = () => resolve(reader.result as string);
//           reader.readAsDataURL(photo);
//         });
//       }
      
//       // Create report object
//       const report: CrimeReport = {
//         reporterId: 'anonymous-user', // In a real app, use authentication
//         type,
//         description,
//         location,
//         photoUrl,
//       };
      
//       // Send to server via socket
//       socket?.emit('crime-report', report);
      
//       // Reset form
//       setType('theft');
//       setDescription('');
//       setPhoto(null);
//       setPhotoPreview(null);
      
//       alert('Crime report submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting report:', error);
//       alert('Error submitting report. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Report a Crime</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Map Section */}
//         <div className="space-y-2">
//           <label className="block font-medium">Location (Click on map to set location)</label>
//           <div className="w-full h-64 bg-gray-200 rounded-lg">
//             {mapLoaded && markerPosition ? (
//               <MapContainer 
//                 center={markerPosition} 
//                 zoom={13} 
//                 style={{ height: '100%', width: '100%' }}
//               >
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <LocationMarker 
//                   position={markerPosition}
//                   setPosition={(pos) => setMarkerPosition(pos)}
//                 />
//               </MapContainer>
//             ) : (
//               <div className="flex items-center justify-center h-full">Loading map...</div>
//             )}
//           </div>
//           {address && (
//             <p className="text-sm text-gray-600">
//               Address: {address}
//             </p>
//           )}
//         </div>
        
//         {/* Crime Type */}
//         <div className="space-y-2">
//           <label htmlFor="crimeType" className="block font-medium">Crime Type</label>
//           <select
//             id="crimeType"
//             value={type}
//             onChange={(e) => setType(e.target.value as CrimeReport['type'])}
//             className="w-full p-2 border rounded-md"
//             required
//           >
//             <option value="theft">Theft</option>
//             <option value="assault">Assault</option>
//             <option value="vandalism">Vandalism</option>
//             <option value="burglary">Burglary</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
        
//         {/* Description */}
//         <div className="space-y-2">
//           <label htmlFor="description" className="block font-medium">Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border rounded-md min-h-32"
//             placeholder="Describe what happened, when it happened, and any additional details..."
//             required
//           />
//         </div>
        
//         {/* Photo Upload */}
//         <div className="space-y-2">
//           <label htmlFor="photo" className="block font-medium">Photo Evidence (Optional)</label>
//           <input
//             id="photo"
//             type="file"
//             accept="image/*"
//             onChange={handlePhotoChange}
//             className="w-full"
//           />
//           {photoPreview && (
//               <Image 
//                 src={photoPreview} 
//                 alt="Preview" 
//                 width={192} 
//                 height={192} 
//                 className="object-cover rounded-md" 
//               />
//           )}
//         </div>
        
//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             disabled={submitting || !isConnected}
//             className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//               submitting || !isConnected ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {submitting ? 'Submitting...' : 'Submit Report'}
//           </button>
          
//           {!isConnected && (
//             <p className="text-red-500 text-sm mt-2">
//               Not connected to server. Please wait or refresh the page.
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CrimeReportForm;
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