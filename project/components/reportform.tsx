'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReportFormData } from '@/types';

export default function ReportForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    intensity: 1.0,
    category: 'general'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert string values to numbers for coordinates and intensity
      const payload = {
        ...formData,
        latitude: parseFloat(formData.latitude.toString()),
        longitude: parseFloat(formData.longitude.toString()),
        intensity: parseFloat(formData.intensity.toString())
      };

      await axios.post('/api/reports', payload);
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setError('Failed to submit report. Please try again.');
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (err) => {
          setError(`Error getting location: ${err.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium">Latitude</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            required
            value={formData.latitude}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium">Longitude</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            required
            value={formData.longitude}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={useCurrentLocation}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        Use Current Location
      </button>

      <div>
        <label htmlFor="intensity" className="block text-sm font-medium">Intensity (0.1-1.0)</label>
        <input
          type="range"
          id="intensity"
          name="intensity"
          min="0.1"
          max="1.0"
          step="0.1"
          value={formData.intensity}
          onChange={handleChange}
          className="mt-1 block w-full"
        />
        <span>{formData.intensity}</span>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="general">General</option>
          <option value="safety">Safety</option>
          <option value="maintenance">Maintenance</option>
          <option value="environment">Environment</option>
          <option value="traffic">Traffic</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
}
