"use client";
import { useState, useEffect, useRef } from 'react';

export default function AnimalForm({ animal, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    habitat: '',
    habitatTypes: [],
    diet: '',
    conservationStatus: '',
    lifespan: '',
    interestingFact: '',
    imageUrl: '',
  });
  const [habitatInput, setHabitatInput] = useState('');
  const [availableImages, setAvailableImages] = useState([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [uploadPreview, setUploadPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Available images in public/images folder
  useEffect(() => {
    setAvailableImages([
      '/images/crocodile.jpeg',
      '/images/tiger.jpeg',
      '/images/eagle.jpg',
      '/images/dolphin.jpg',
      '/images/lion.jpg',
      '/images/frog.jpg',
      '/images/kangaroo.jpg',
      '/images/elephant.jpg',
      '/images/panda.jpg',
      '/images/parrot.jpg',
      '/images/pecock.jpg',
      '/images/penguin.jpg',
      '/images/giraffe.jpg',
      '/images/zebra.jpg',
    ]);
  }, []);

  // If editing, populate form with animal data
  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name || '',
        description: animal.description || '',
        habitat: animal.habitat || '',
        habitatTypes: animal.habitatTypes || [],
        diet: animal.diet || '',
        conservationStatus: animal.conservationStatus || '',
        lifespan: animal.lifespan || '',
        interestingFact: animal.interestingFact || '',
        imageUrl: animal.imageUrl || '',
      });
    }
  }, [animal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageSelect = (imagePath) => {
    setFormData({
      ...formData,
      imageUrl: imagePath,
    });
    setUploadPreview(null);
    setShowImagePicker(false);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create a preview for the selected file
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    try {
      // Create a formData object for the file upload
      const uploadData = new FormData();
      uploadData.append('file', file);
      
      // Upload the file to your server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      // Get the path to the uploaded file
      const data = await response.json();
      setFormData({
        ...formData,
        imageUrl: data.filePath, // This should be the path returned from the server
      });
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image. Please try again or use an existing image.');
    }
  };

  const handleHabitatAdd = () => {
    if (habitatInput && !formData.habitatTypes.includes(habitatInput)) {
      setFormData({
        ...formData,
        habitatTypes: [...formData.habitatTypes, habitatInput],
      });
      setHabitatInput('');
    }
  };

  const handleHabitatRemove = (index) => {
    const newHabitatTypes = [...formData.habitatTypes];
    newHabitatTypes.splice(index, 1);
    setFormData({
      ...formData,
      habitatTypes: newHabitatTypes,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const conservationStatuses = [
    'Extinct', 
    'Extinct in the Wild', 
    'Critically Endangered', 
    'Endangered', 
    'Vulnerable', 
    'Near Threatened', 
    'Least Concern', 
    'Data Deficient', 
    'Not Evaluated'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <div className="mt-1 space-y-2">
            <div className="flex items-end space-x-2">
              <div className="flex-grow">
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  placeholder="/images/animal-name.jpg"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => setShowImagePicker(!showImagePicker)}
                className="bg-blue-600 text-white px-3 py-2 rounded"
              >
                Browse
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                Upload new image
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                onChange={handleFileSelect} 
                className="hidden" 
                accept="image/*" 
              />
              
              {(formData.imageUrl || uploadPreview) && (
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img 
                    src={uploadPreview || formData.imageUrl} 
                    alt="Preview" 
                    className="h-24 w-24 object-cover rounded ml-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.jpg"; // Fallback image
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          
          {showImagePicker && (
            <div className="mt-2 p-3 border rounded-md bg-gray-50 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {availableImages.map((img, index) => (
                  <div 
                    key={index}
                    onClick={() => handleImageSelect(img)}
                    className={`cursor-pointer p-1 rounded border ${formData.imageUrl === img ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-100'}`}
                  >
                    <img 
                      src={img} 
                      alt={`Animal ${index + 1}`} 
                      className="h-20 w-full object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/profile-placeholder.jpg"; // Fallback image
                      }}
                    />
                    <p className="text-xs text-center mt-1 truncate">{img.split('/').pop()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Habitat</label>
          <input
            type="text"
            name="habitat"
            value={formData.habitat}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Diet</label>
          <input
            type="text"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Conservation Status</label>
          <select
            name="conservationStatus"
            value={formData.conservationStatus}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            required
          >
            <option value="">Select a status</option>
            {conservationStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lifespan</label>
          <input
            type="text"
            name="lifespan"
            value={formData.lifespan}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            required
            placeholder="e.g. 10-15 years"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Interesting Fact</label>
        <textarea
          name="interestingFact"
          value={formData.interestingFact}
          onChange={handleChange}
          rows={2}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Habitat Types</label>
        <div className="flex">
          <input
            type="text"
            value={habitatInput}
            onChange={(e) => setHabitatInput(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3"
            placeholder="e.g. Forest, Desert, etc."
          />
          <button
            type="button"
            onClick={handleHabitatAdd}
            className="mt-1 bg-blue-600 text-white px-4 rounded-r-md"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.habitatTypes.map((type, index) => (
            <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
              <span>{type}</span>
              <button
                type="button"
                onClick={() => handleHabitatRemove(index)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {animal ? 'Update Animal' : 'Add Animal'}
        </button>
      </div>
    </form>
  );
}