"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="about-hero"
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/professional-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-5xl font-extrabold text-white">
            About Our Zoo
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Discover our mission, history, and the passionate team behind our wildlife conservation efforts
          </p>
        </div>
      </section>

      {/* About Content */}
      <main className="bg-gray-50 py-12 px-4 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-lg shadow overflow-hidden p-8 mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Founded in 1965, our zoo is dedicated to wildlife conservation, education, and creating memorable experiences that connect people with nature. We believe that by fostering an appreciation for wildlife, we can inspire the next generation of conservationists to protect our planet's biodiversity.
            </p>
            <p className="text-gray-700 mb-6">
              Our conservation programs extend beyond our facilities to support initiatives worldwide. Through partnerships with local and international organizations, we work to preserve endangered species and their habitats.
            </p>
          </div>
        </div>
      </main>

      {/* Achievements Section */}
      <section id="achievements" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Our Achievements
          </h2>
          <div className="max-w-3xl mx-auto text-center text-gray-700 space-y-4">
            <p>
              Over the past five decades, our conservation efforts have helped increase the populations of 12 endangered species. Our breeding programs have successfully reintroduced 200+ animals back into their natural habitats.
            </p>
            <p>
              We've educated over 1 million visitors through our interactive exhibits and outreach programs. Our research team has published 45 peer-reviewed studies on animal behavior and conservation techniques.
            </p>
            <p>
              We're proud to be recognized as a 5-star wildlife facility, maintaining the highest standards of animal care and visitor experience.
            </p>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Any Questions?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you're interested in planning a visit, learning more about our conservation efforts, or collaborating with us, feel free to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}