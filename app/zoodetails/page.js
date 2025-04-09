"use client";
import Link from "next/link";

export default function ZooDetailsPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="zoo-details-hero"
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/professional-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-5xl font-extrabold text-white">
            Zoo Details
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Explore our world-class exhibits, facilities, and animal experiences
          </p>
        </div>
      </section>

      {/* Main Information Section */}
      <main className="bg-gray-50 py-12 px-4 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-lg shadow overflow-hidden p-8 mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Our Zoo</h2>
            <p className="text-gray-700 mb-6">
              Located in the heart of the city on 250 acres of landscaped grounds, our zoo is home to over 2,500 animals representing more than 200 species from around the world. Established in 1965, we've grown from a small municipal zoo into a world-renowned conservation and education center.
            </p>
            <p className="text-gray-700 mb-6">
              Our zoo is divided into seven distinct geographical zones, each recreating the natural habitats of the animals that live there. From the African Savanna to the Asian Rainforest, visitors can experience global biodiversity in a single day.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Visiting Hours</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM</li>
                  <li><strong>Weekends & Holidays:</strong> 8:00 AM - 6:00 PM</li>
                  <li><strong>Summer Extended Hours (June-August):</strong> Open until 8:00 PM</li>
                  <li><strong>Closed:</strong> December 25th and January 1st</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Admission</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Adults (18-64):</strong> $22.99</li>
                  <li><strong>Children (3-17):</strong> $14.99</li>
                  <li><strong>Seniors (65+):</strong> $17.99</li>
                  <li><strong>Children under 3:</strong> Free</li>
                  <li><strong>Members:</strong> Free</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Featured Exhibits */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Exhibits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src="/images/exhibit1.jpg" alt="African Savanna" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">African Savanna</h3>
                <p className="text-gray-700">
                  Experience the majesty of Africa's plains with our lions, giraffes, zebras, and elephants in a spacious habitat that mimics their natural environment.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src="/images/exhibit2.jpg" alt="Rainforest Adventure" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Rainforest Adventure</h3>
                <p className="text-gray-700">
                  Journey through a lush tropical environment with exotic birds, monkeys, jaguars, and reptiles from the world's most biodiverse ecosystems.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src="/images/exhibit3.jpg" alt="Arctic Kingdom" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Arctic Kingdom</h3>
                <p className="text-gray-700">
                  Discover the animals of the polar regions, including polar bears, penguins, and arctic foxes in state-of-the-art climate-controlled habitats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Amenities */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Visitor Amenities
          </h2>
          <div className="max-w-3xl mx-auto text-center text-gray-700 space-y-4">
            <p>
              Enhance your zoo experience with our range of amenities including multiple dining options, gift shops, stroller rentals, and first aid stations located throughout the park.
            </p>
            <p>
              Our accessible pathways ensure everyone can enjoy the zoo, with rest areas and shaded benches available throughout the grounds. Free Wi-Fi is available in all public areas.
            </p>
            <p>
              Don't miss our daily animal feedings, keeper talks, and interactive shows included with your admission.
            </p>
          </div>
        </div>
      </section>

      {/* Education Programs */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Educational Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">School Programs</h3>
              <p className="text-gray-700">
                We offer curriculum-based field trips for K-12 students, with special guided tours and hands-on learning experiences tailored to different age groups.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Summer Camps</h3>
              <p className="text-gray-700">
                Our popular week-long camps provide children ages 5-15 with immersive wildlife experiences, behind-the-scenes access, and conservation activities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Keeper for a Day</h3>
              <p className="text-gray-700">
                Get a glimpse into the life of a zookeeper with this special program where participants assist staff with animal care, enrichment, and feeding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Conservation Workshops</h3>
              <p className="text-gray-700">
                Join our monthly workshops focused on local and global conservation issues, with practical ways to get involved in wildlife protection efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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