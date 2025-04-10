"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnimalNavigation() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const pathname = usePathname();
  const currentId = pathname?.split('/').pop();

  // Fetch animals from MongoDB API
  useEffect(() => {
    async function fetchAnimals() {
      try {
        const response = await fetch('/api/animals');
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }
        const data = await response.json();
        setAnimals(data);
      } catch (err) {
        console.error('Error fetching animals:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimals();
  }, []);

  // Loading state
  if (loading) {
    return (
      <nav className="flex justify-center my-4">
        <div className="px-4 py-2 bg-gray-100 rounded-md animate-pulse">
          Loading animals...
        </div>
      </nav>
    );
  }

  // Error state
  if (error) {
    return (
      <nav className="flex justify-center my-4">
        <div className="px-4 py-2 bg-red-100 text-red-700 rounded-md">
          Error: {error}
        </div>
      </nav>
    );
  }

  // No animals
  if (animals.length === 0) {
    return (
      <nav className="flex justify-center my-4">
        <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md">
          No animals available
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex flex-wrap justify-center gap-2 my-4 px-4">
      {animals.map((animal) => {
        const isActive = animal.id === currentId;
        return (
          <Link
            key={animal.id}
            href={`/animals/${animal.id}`}
            className={`px-3 py-1 rounded-md transition whitespace-nowrap
              ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
              hover:bg-blue-500 hover:text-white`}
          >
            {animal.name}
          </Link>
        );
      })}
    </nav>
  );
}