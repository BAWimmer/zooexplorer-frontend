// Blog page component. This component fetches blog posts from an API and displays them in a grid layout.

"use client";

import { useState, useEffect } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Blogs</h2>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Zoo Explorer Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(post.date).toLocaleDateString()} • {post.author} • {post.readTime}
              </p>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              
              {/* Display primary video if available */}
              {post.videoUrl && (
                <div className="mb-4">
                  <iframe
                    className="w-full aspect-video rounded"
                    src={post.videoUrl}
                    title={post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              {/* Display secondary video if available */}
              {post.secondaryVideoUrl && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Additional Video</h3>
                  <iframe
                    className="w-full aspect-video rounded"
                    src={post.secondaryVideoUrl}
                    title={`${post.title} - Additional Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              {/* Technical details */}
              {post.technicalDetails && (
                <details className="mb-4">
                  <summary className="cursor-pointer text-blue-600 hover:underline">
                    Technical Details
                  </summary>
                  <p className="mt-2 text-gray-600">{post.technicalDetails}</p>
                </details>
              )}
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}