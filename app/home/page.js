"use client";
import AnimalCard from '../../components/AnimalCard';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimalCharts from '../../components/AnimalCharts';

export default function Home() {
  // State management
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterHabitat, setFilterHabitat] = useState('All');
  const [filterConservation, setFilterConservation] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch animals from MongoDB via API
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

  // Compute derived values after data is loaded
  const allHabitatTypes = animals.flatMap(animal => animal.habitatTypes || []);
  const allConservationStatuses = ['All', ...new Set(animals.map((a) => a.conservationStatus))];
  const uniqueHabitatTypes = ['All', ...new Set(allHabitatTypes)].sort();

  // Filter and sort the animals based on user selections
  const filteredAnimals = animals
    .filter((animal) => filterHabitat === 'All' || (animal.habitatTypes || []).includes(filterHabitat))
    .filter((animal) => filterConservation === 'All' || animal.conservationStatus === filterConservation)
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // Function to scroll to the interactive map section smoothly
  const scrollToMap = () => {
    const mapSection = document.getElementById("interactive-map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading animals...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4"
        >
          <h1 className="text-5xl font-extrabold text-white">
            Welcome to ZooExplorer
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Your ultimate guide to the animal kingdom
          </p>
          <motion.button
            onClick={scrollToMap}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Explore Now
          </motion.button>
        </motion.div>
      </section>

      {/* Filters and Sort */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center gap-4 md:gap-8 items-center">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">Filter by Habitat:</span>
            <select
              className="border border-gray-300 rounded-md bg-white shadow py-2 px-4 text-gray-700"
              onChange={(e) => setFilterHabitat(e.target.value)}
              value={filterHabitat}
            >
              {uniqueHabitatTypes.map((habitat) => (
                <option key={habitat} value={habitat}>{habitat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">Filter by Conservation Status:</span>
            <select
              className="border border-gray-300 rounded-md bg-white shadow py-2 px-4 text-gray-700"
              onChange={(e) => setFilterConservation(e.target.value)}
              value={filterConservation}
            >
              {allConservationStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">Sort by Name:</span>
            <select
              className="border border-gray-300 rounded-md bg-white shadow py-2 px-4 text-gray-700"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending (A-Z)</option>
              <option value="desc">Descending (Z-A)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Animal Gallery */}
      <section id="animals" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Animal Gallery
          </h2>
          
          {filteredAnimals.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">No animals found with the selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAnimals.map((animal) => (
                <motion.div
                  key={animal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AnimalCard animal={animal} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Blog Button */}
          <div className="mt-8 text-right">
            <a
              href="/blog"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
            >
              View Blog
            </a>
          </div>
        </div>
      </section>

      {/* Data Visualizations Section */}
      <section id="data-visualizations" className="py-12 bg-gray-50">
        <AnimalCharts />
      </section>

      {/* Interactive Map Section */}
      <section id="interactive-map" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Interactive Map
          </h2>
          <div className="w-full h-96">
            <iframe
              title="Interactive Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.728409784436!2d-122.08424968469062!3d37.42206597982686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb0a03218af3b%3A0xd256be5b8f3e2d70!2sGoogleplex!5e0!3m2!1sen!2sus!4v1606904891478!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Zoo Details */}
      <section id="zoo-details" className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Zoo Details
          </h2>
          <div className="max-w-3xl mx-auto text-center text-gray-200 space-y-4">
            <p>
              Our zoo is located in the heart of the city, offering visitors an immersive wildlife experience with over 200 species from around the world. Established in 1965, the zoo is dedicated to animal conservation, education, and research.
            </p>
            <p>
              Explore our state-of-the-art facilities, interactive exhibits, guided tours, and conservation initiatives aimed at preserving endangered species.
            </p>
            <p>
              Enjoy a day of adventure, learning, and fun as you get up close with nature!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}