"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle unauthenticated status
    if (status === "unauthenticated") {
      router.push("/signin");
      setLoading(false);
      return;
    }

    // Handle authenticated status with user ID
    if (status === "authenticated") {
      if (session?.user?.id) {
        fetchUserProfile(session.user.id);
      } else {
        // No user ID found - stop loading
        setLoading(false);
      }
    }
  }, [status, session, router]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setFormData(userData);
      } else {
        console.error("Failed to fetch profile:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
  };

  const handleEditToggle = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode(false);
      } else {
        console.error("Failed to update profile:", await response.text());
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-opacity-75 mx-auto"></div>
          <p className="mt-2">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!user && !loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl text-red-600">Unable to load profile data</p>
          <button
            onClick={() => router.push("/signin")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Return to Sign In
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "";

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-4xl font-semibold text-white">My Profile</h1>
          <p className="mt-2 text-lg text-gray-200">
            Manage your account details
          </p>
        </div>
      </section>

      {/* Main Profile Content */}
      <div className="bg-gray-100 flex items-center justify-center py-6 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
          {/* Profile Header */}
          <div className="flex items-center p-6 bg-blue-600">
            <img
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
              src={user?.profilePic || "/images/profile-placeholder.jpg"}
              alt={user?.name || "User"}
            />
            <div className="ml-4">
              {editMode ? (
                <input
                  name="name"
                  type="text"
                  value={formData?.name || ""}
                  onChange={handleChange}
                  className="text-xl font-bold text-white bg-blue-600 border-b border-white focus:outline-none"
                  placeholder="Your Name"
                />
              ) : (
                <h2 className="text-xl font-bold text-white">
                  {user?.name || "User"}
                </h2>
              )}
              <p className="text-white">{user?.email}</p>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          {/* Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Account Details
                </h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium text-gray-600">Email:</span>{" "}
                    <span className="text-gray-800">{user?.email}</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Role:</span>{" "}
                    <span className="text-gray-800">
                      {user?.role || "User"}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Member Since:
                    </span>{" "}
                    <span className="text-gray-800">{formattedDate}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Personal Info
                </h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium text-gray-600">Location:</span>{" "}
                    {editMode ? (
                      <input
                        name="location"
                        type="text"
                        value={formData?.location || ""}
                        onChange={handleChange}
                        className="text-gray-800 border-b border-gray-400 focus:outline-none"
                        placeholder="Your Location"
                      />
                    ) : (
                      <span className="text-gray-800">
                        {user?.location || "Not specified"}
                      </span>
                    )}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Bio:</span>{" "}
                    {editMode ? (
                      <textarea
                        name="bio"
                        value={formData?.bio || ""}
                        onChange={handleChange}
                        className="text-gray-800 border border-gray-400 rounded p-1 focus:outline-none w-full"
                        rows="3"
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <span className="text-gray-800">
                        {user?.bio || "No bio provided"}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-colors duration-300"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Zoo Section */}
      <section id="zoo-details" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Zoo Details
          </h2>
          <div className="max-w-3xl mx-auto text-center text-gray-700 space-y-4">
            <p>
              Our zoo is located in the heart of the city, offering visitors an immersive wildlife experience with over 200 species from around the world.
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
