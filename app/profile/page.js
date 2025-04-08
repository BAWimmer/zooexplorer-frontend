"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();

  // Dummy user data; replace with real user data as needed.
  const initialUserData = {
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "User",
    joined: "January 2022",
    location: "New York, USA",
    bio: "A passionate wildlife enthusiast and frequent visitor of ZooExplorer. I love exploring nature and contributing to animal conservation efforts.",
    profilePic: "/images/profile-placeholder.jpg",
  };

  const [user, setUser] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialUserData);

  const handleSignOut = () => {
    router.push("/signin");
  };

  const handleEditToggle = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(user); // revert any changes
    setEditMode(false);
  };

  const handleSave = () => {
    // Here you would normally validate and persist the changes to your backend.
    setUser(formData);
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section (Smaller with formal styling) */}
      <section
        id="home"
        className="relative h-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/professional-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-4xl font-semibold text-white">My Profile</h1>
          <p className="mt-2 text-lg text-gray-200">Manage your account details</p>
        </div>
      </section>

      {/* Main Profile Content */}
      <div className="bg-gray-100 flex items-center justify-center py-6 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
          {/* Profile Header */}
          <div className="flex items-center p-6 bg-blue-600">
            <img
              className="w-20 h-20 rounded-full border-4 border-white"
              src={user.profilePic}
              alt={user.name}
            />
            <div className="ml-4">
              {editMode ? (
                <>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-xl font-bold text-white bg-blue-600 border-b border-white focus:outline-none"
                  />
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="text-white bg-blue-600 border-b border-white focus:outline-none"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <p className="text-white">@{user.username}</p>
                </>
              )}
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          {/* Detailed Account Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Details</h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium text-gray-600">Email:</span>{" "}
                    {editMode ? (
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-gray-800 border-b border-gray-400 focus:outline-none"
                      />
                    ) : (
                      <span className="text-gray-800">{user.email}</span>
                    )}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Role:</span>{" "}
                    <span className="text-gray-800">{user.role}</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Member Since:</span>{" "}
                    <span className="text-gray-800">{user.joined}</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Info</h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium text-gray-600">Location:</span>{" "}
                    {editMode ? (
                      <input
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        className="text-gray-800 border-b border-gray-400 focus:outline-none"
                      />
                    ) : (
                      <span className="text-gray-800">{user.location}</span>
                    )}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Bio:</span>{" "}
                    {editMode ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="text-gray-800 border border-gray-400 rounded p-1 focus:outline-none w-full"
                        rows="3"
                      />
                    ) : (
                      <span className="text-gray-800">{user.bio}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
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