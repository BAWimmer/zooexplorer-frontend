"use client";

import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { animals } from '../../data/animals';
import AnimalNavigation from '../../components/AnimalNavigation';

export default function AnimalDetails({ animal }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-gray-700">ZooExplorer</div>
          <ul className="flex space-x-6 text-gray-700">
            <li>
              <a href="/home" className="hover:text-blue-700">
                Home
              </a>
            </li>
            <li>
              <a href="/#about" className="hover:text-blue-700">
                About
              </a>
            </li>
            <li>
              <a href="/#animals" className="hover:text-blue-700">
                Animals
              </a>
            </li>
            <li>
              <a href="/#zoo-details" className="hover:text-blue-700">
                Zoo Details
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-blue-700">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('${animal.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4"
        >
          <h1 className="text-5xl font-extrabold text-white">
            {animal.name}
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            {animal.description}
          </p>
        </motion.div>
      </section>

      {/* Animal Navigation */}
      <AnimalNavigation />

      {/* Animal Profile Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Animal Profile
          </h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Basic Details */}
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">Habitat:</span>{" "}
                  {animal.habitat}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">Diet:</span>{" "}
                  {animal.diet}
                </p>
                <p className="text-lg flex items-center gap-2">
                  <span className="font-semibold text-blue-600">
                    Conservation Status:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      animal.conservationStatus === "Endangered"
                        ? "bg-red-100 text-red-800"
                        : animal.conservationStatus === "Vulnerable"
                        ? "bg-orange-100 text-orange-800"
                        : animal.conservationStatus === "Near Threatened"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {animal.conservationStatus}
                  </span>
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">Lifespan:</span>{" "}
                  {animal.lifespan}
                </p>
              </div>

              {/* Right Column: Detailed Description & Fact */}
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">{animal.description}</p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                  <p className="text-lg italic text-blue-700">
                    <span className="font-semibold">Interesting Fact:</span>{" "}
                    {animal.interestingFact}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => router.back()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Go Back to Gallery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>
            For inquiries, please email us at{" "}
            <a
              href="mailto:info@zooexplorer.com"
              className="underline hover:text-blue-400"
            >
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

export async function getStaticPaths() {
  const paths = animals.map((animal) => ({
    params: { id: animal.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const animal = animals.find((a) => a.id === params.id);
  return { props: { animal } };
}
