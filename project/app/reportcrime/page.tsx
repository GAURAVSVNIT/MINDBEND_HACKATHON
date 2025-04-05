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