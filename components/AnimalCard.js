// Animal Card Componennt for displaying animal details

"use client";
import { useRouter } from 'next/navigation';

export default function AnimalCard({ animal }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/animals/${animal.id}`);
  };

  return (
    <div 
      onClick={handleCardClick} 
      className="cursor-pointer block border rounded-lg shadow p-4 bg-white hover:shadow-xl transition-shadow"
    >
      <img
        src={animal.imageUrl}
        alt={animal.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold text-black mb-2">{animal.name}</h2>
      <p className="text-gray-600">{animal.description}</p>
      <div className="mt-4 space-y-1">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">Habitat:</span> {animal.habitat}
        </p>
        <p className="text-sm text-gray-800">
          <span className="font-semibold">Diet:</span> {animal.diet}
        </p>
        <p className="text-sm text-gray-800">
          <span className="font-semibold">Conservation Status:</span> {animal.conservationStatus}
        </p>
      </div>
    </div>
  );
}
