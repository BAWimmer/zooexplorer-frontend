"use client";

import { useState, useEffect, use } from 'react'; // Added 'use' import
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimalNavigation from '../../../components/AnimalNavigation';

export default function AnimalDetails({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch animal from MongoDB via API
  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await fetch(`/api/animals/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch animal');
        }
        const data = await response.json();
        setAnimal(data);
      } catch (err) {
        console.error('Error fetching animal:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading animal details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Animal</h2>
          <p className="text-lg">{error}</p>
          <button 
            onClick={() => router.push('/home')} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Animal Not Found</h2>
          <p className="text-lg">The animal you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/home')} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimalNavigation />
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            {animal.name}
          </h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <img 
                  src={animal.imageUrl} 
                  alt={animal.name}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <p><span className="font-bold">Description:</span> {animal.description}</p>
                <p><span className="font-bold">Habitat:</span> {animal.habitat}</p>
                <p><span className="font-bold">Diet:</span> {animal.diet}</p>
                <p><span className="font-bold">Conservation Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                    animal.conservationStatus === "Endangered" ? "bg-red-100 text-red-800" :
                    animal.conservationStatus === "Vulnerable" ? "bg-orange-100 text-orange-800" :
                    animal.conservationStatus === "Near Threatened" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {animal.conservationStatus}
                  </span>
                </p>
                <p><span className="font-bold">Lifespan:</span> {animal.lifespan}</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p><span className="font-bold">Interesting Fact:</span> {animal.interestingFact}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button 
                onClick={() => router.push('/home')} 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
              >
                Back to Animals
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}