"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AnimalForm from '../../../components/AnimalForm';

export default function AdminAnimals() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Check if user is admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'Admin') {
      router.push('/');
    }
  }, [session, status, router]);

  // Fetch animals
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

  // Handle animal creation
  const handleCreateAnimal = async (animalData) => {
    try {
      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create animal');
      }

      const newAnimal = await response.json();
      setAnimals([...animals, newAnimal]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error creating animal:', err);
      alert(`Error: ${err.message}`);
    }
  };

  // Handle animal update
  const handleUpdateAnimal = async (animalData) => {
    try {
      const response = await fetch(`/api/animals/${editingAnimal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update animal');
      }

      const updatedAnimal = await response.json();
      setAnimals(animals.map(animal => 
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      ));
      setEditingAnimal(null);
    } catch (err) {
      console.error('Error updating animal:', err);
      alert(`Error: ${err.message}`);
    }
  };

  // Handle animal deletion
  const handleDeleteAnimal = async (id) => {
    try {
      const response = await fetch(`/api/animals/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete animal');
      }

      setAnimals(animals.filter(animal => animal.id !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting animal:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (status === 'authenticated' && session?.user?.role !== 'Admin') {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Animal Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
        >
          Add New Animal
        </button>
      </div>

      {/* Animals Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Habitat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conservation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={animal.imageUrl} 
                    alt={animal.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{animal.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{animal.habitat}</td>
                <td className="px-6 py-4 whitespace-nowrap">{animal.conservationStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditingAnimal(animal)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(animal.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Animal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h2 className="text-xl font-semibold mb-4">Add New Animal</h2>
            <AnimalForm 
              onSubmit={handleCreateAnimal} 
              onCancel={() => setIsAddModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Animal Modal */}
      {editingAnimal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h2 className="text-xl font-semibold mb-4">Edit Animal</h2>
            <AnimalForm 
              animal={editingAnimal} 
              onSubmit={handleUpdateAnimal} 
              onCancel={() => setEditingAnimal(null)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this animal? This action cannot be undone.</p>
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAnimal(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}