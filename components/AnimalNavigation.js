// components/AnimalNavigation.js
import Link from 'next/link';
import { animals } from '../data/animals';
import { useRouter } from 'next/router';

export default function AnimalNavigation() {
  const router = useRouter();
  const currentId = router.query.id; 

  return (
    <nav className="flex justify-center space-x-4 my-4">
      {animals.map((animal) => {
        const isActive = animal.id === currentId;
        return (
          <Link
            key={animal.id}
            href={`/animals/${animal.id}`}
            className={`px-3 py-1 rounded-md transition 
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
