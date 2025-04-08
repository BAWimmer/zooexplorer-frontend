"use client";
import AnimalCard from '../../components/AnimalCard';
import { animals } from '../../data/animals';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimalCharts from '../../components/AnimalCharts';

export default function Home() {
  const [filterHabitat, setFilterHabitat] = useState('All');
  const [filterConservation, setFilterConservation] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  const allHabitatTypes = animals.flatMap(animal => animal.habitatTypes);
  const allConservationStatuses = ['All', ...new Set(animals.map((a) => a.conservationStatus))];
  const uniqueHabitatTypes = ['All', ...new Set(allHabitatTypes)].sort();

  const filteredAnimals = animals
  .filter((animal) => filterHabitat === 'All' || animal.habitatTypes.includes(filterHabitat))
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-gray-700">ZooExplorer</div>
          <ul className="flex space-x-6 text-gray-700">
            <li><a href="#home" className="hover:text-blue-700">Home</a></li>
            <li><a href="#about" className="hover:text-blue-700">About</a></li>
            <li><a href="#animals" className="hover:text-blue-700">Animals</a></li>
            <li><a href="#zoo-details" className="hover:text-blue-700">Zoo Details</a></li>
            <li><a href="#contact" className="hover:text-blue-700">Contact</a></li>
            <li><a href="/profile" className="hover:text-blue-700">Profile</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/professional-bg.jpg')" }}
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

          {/* Single 'View Blog' Button on the right */}
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
      <section id="zoo-details" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Zoo Details
          </h2>
          <div className="max-w-3xl mx-auto text-center text-gray-700 space-y-4">
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

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>
            For inquiries, please email us at{" "}
            <a href="mailto:info@zooexplorer.com" className="underline hover:text-blue-400">
              info@zooexplorer.com
            </a>
          </p>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} ZooExplorer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
