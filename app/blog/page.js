"use client";
import Link from "next/link";
import { useState } from "react";

const dummyPosts = [
  {
    id: 1,
    title: "Conservation Success: Saving Endangered Species",
    date: "2023-03-15",
    excerpt:
      "Learn how community efforts and conservation programs are saving endangered species from extinction. Discover inspiring stories and innovative solutions that are making a difference.",
    author: "Jane Smith",
    readTime: "5 min read",
    imageUrl: "/images/blog1.jpg",
    videoUrl: "https://www.youtube.com/embed/SMly_BDdJlk",
    technicalDetails:
      "This post aggregates data from environmental agencies and local wildlife research centers. Hover over the title for more info.",
  },
  {
    id: 2,
    title: "Zoo Updates: New Interactive Exhibits",
    date: "2023-04-10",
    excerpt:
      "Our zoo has recently launched new interactive exhibits designed to educate and entertain visitors. Get an inside look at the latest features and improvements.",
    author: "John Doe",
    readTime: "3 min read",
    imageUrl: "/images/blog2.jpg",
    videoUrl: "https://www.youtube.com/embed/rjBdwSow0hY",
    technicalDetails:
      "Exhibit design includes augmented reality components and interactive digital displays for enhanced visitor engagement.",
  },
  {
    id: 3,
    title: "Wildlife Education: Understanding Animal Behavior",
    date: "2023-05-05",
    excerpt:
      "Join us as we explore the fascinating world of animal behavior and the importance of wildlife education. Learn how these insights help in conservation efforts.",
    author: "Alice Johnson",
    readTime: "4 min read",
    imageUrl: "/images/blog3.jpg",
    videoUrl: "https://www.youtube.com/embed/_yQJDdzEbio",
    technicalDetails:
      "The analysis uses ethological studies and behavioral science research to explain observed phenomena in natural habitats.",
  },
];

export default function BlogPage() {
  const [posts] = useState(dummyPosts);

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/professional-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-5xl font-extrabold text-white">
            Wildlife & Zoo News
          </h1>
          <p className="mt-4 text-xl text-gray-200">
            Stay updated with the latest news, multimedia insights, and in‑depth
            analyses on wildlife conservation and zoo updates.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <main className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-8">
                  <h2
                    className="text-3xl font-semibold text-gray-800 mb-4"
                    title="Click for technical insights"
                  >
                    {post.title}
                  </h2>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">&bull;</span>
                    <span>{post.author}</span>
                    <span className="mx-2">&bull;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  {/* Collapsible section for technical details */}
                  <details className="mb-4">
                    <summary className="cursor-pointer text-blue-600 hover:underline">
                      Technical Details
                    </summary>
                    <p className="mt-2 text-gray-600">{post.technicalDetails}</p>
                  </details>
                  {/* Primary Video Embed */}
                  {post.videoUrl && (
                    <div className="mb-4">
                      <iframe
                        className="w-full h-56 rounded-md shadow"
                        src={post.videoUrl}
                        title={post.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {/* Secondary Video Embed */}
                  {post.secondaryVideoUrl && (
                    <div className="mb-4">
                      <h3 className="text-xl font-medium text-gray-800 mb-2">
                        Additional Video
                      </h3>
                      <iframe
                        className="w-full h-56 rounded-md shadow"
                        src={post.secondaryVideoUrl}
                        title={`${post.title} - Additional Video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-block px-6 py-3 border border-gray-800 text-gray-800 font-medium rounded hover:bg-gray-800 hover:text-white transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

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
    </>
  );
}