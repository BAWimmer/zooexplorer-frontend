// Animal Diet Statistics Component
// This component fetches animal data from the MongoDB API and displays a bar chart of their diet distribution.

"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnimalDietStats = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch animals from MongoDB API
  useEffect(() => {
    async function fetchAnimals() {
      try {
        const response = await fetch('/api/animals');
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }
        const data = await response.json();
        console.log("Fetched animals:", data); // Debug: log fetched data
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

  // Loading and error states
  if (loading) {
    return <div className="text-center p-4">Loading diet statistics...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  // Improved diet detection - more flexible with various formats
  const dietCounts = animals.reduce((acc, animal) => {
    // Skip if no diet info
    if (!animal.diet) return acc;
    
    const dietLower = animal.diet.toLowerCase();
    
    // Log the diet for debugging
    console.log(`Animal: ${animal.name}, Diet: ${animal.diet}`);
    
    // More flexible diet categorization
    if (dietLower.includes('carniv') || 
        dietLower.includes('meat') || 
        dietLower.includes('predator')) {
      acc['Carnivorous'] = (acc['Carnivorous'] || 0) + 1;
    } 
    else if (dietLower.includes('herbiv') || 
             dietLower.includes('plant') || 
             dietLower.includes('grass') ||
             dietLower.includes('leaf') ||
             dietLower.includes('vegetarian')) {
      acc['Herbivorous'] = (acc['Herbivorous'] || 0) + 1;
    } 
    else if (dietLower.includes('omniv') || 
             (dietLower.includes('plant') && dietLower.includes('meat')) ||
             dietLower.includes('both') ||
             dietLower.includes('varied')) {
      acc['Omnivorous'] = (acc['Omnivorous'] || 0) + 1;
    }
    else {
      // Fallback for other diets
      acc['Other'] = (acc['Other'] || 0) + 1;
    }
    return acc;
  }, {});

  // If no diet categories were found, create a default chart
  if (Object.keys(dietCounts).length === 0 && animals.length > 0) {
    console.log("No diet categories detected. Creating default chart.");
    // Create a simple count of animals with/without diet info
    dietCounts['Animals with diet info'] = animals.filter(a => a.diet).length;
    dietCounts['Animals without diet info'] = animals.filter(a => !a.diet).length;
  }

  const labels = Object.keys(dietCounts);
  const data = Object.values(dietCounts);

  // More colors to accommodate additional categories
  const colors = [
    'rgba(178, 34, 34, 0.7)',   // firebrick (carnivorous)
    'rgba(30, 144, 255, 0.7)',  // dodgerblue (herbivorous)
    'rgba(46, 139, 87, 0.7)',   // seagreen (omnivorous)
    'rgba(128, 128, 128, 0.7)', // gray (other)
  ];
  const borderColors = colors.map(color => color.replace('0.7', '1'));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Animals',
        data,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        borderColor: labels.map((_, i) => borderColors[i % colors.length]),
        borderWidth: 1,
        borderRadius: 3,
        barPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: 'Helvetica, Arial, sans-serif', size: 14 },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Animal Diet Distribution',
        font: { family: 'Helvetica, Arial, sans-serif', size: 18, weight: 'bold' },
        color: '#000',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { family: 'Helvetica, Arial, sans-serif', size: 14 },
        bodyFont: { family: 'Helvetica, Arial, sans-serif', size: 12 },
        padding: 8,
      },
    },
    scales: {
      x: {
        ticks: { font: { family: 'Helvetica, Arial, sans-serif', size: 12 }, color: '#444' },
        grid: { display: false },
      },
      y: {
        ticks: { font: { family: 'Helvetica, Arial, sans-serif', size: 12 }, color: '#444' },
        grid: { color: 'rgba(200,200,200,0.3)' },
        beginAtZero: true,
      },
    },
    animation: { duration: 1000, easing: 'easeOutQuad' },
  };

  // If no data available at all
  if (animals.length === 0) {
    return <div className="text-center p-4">No animal data available</div>;
  }

  return (
    <div style={{ width: '500px', height: '350px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AnimalDietStats;