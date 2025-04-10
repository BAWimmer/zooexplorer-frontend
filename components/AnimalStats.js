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

const AnimalStats = () => { // Changed from AnimalDietStats to AnimalStats
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
    return <div className="text-center p-4">Loading conservation statistics...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  // Count animals by conservation status
  const conservationCounts = animals.reduce((acc, animal) => {
    // Check if conservationStatus exists
    if (!animal.conservationStatus) return acc;
    
    const status = animal.conservationStatus;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(conservationCounts);
  const data = Object.values(conservationCounts);

  // Colors for conservation status
  const colors = [
    'rgba(70, 130, 180, 0.7)',  // steelblue
    'rgba(112, 128, 144, 0.7)', // slategray
    'rgba(119, 136, 153, 0.7)', // lightslategray
    'rgba(47, 79, 79, 0.7)',    // darkslategray
    'rgba(100, 149, 237, 0.7)', // cornflowerblue
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
        text: 'Animal Conservation Status', // Changed from Diet Distribution to Conservation Status
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
      },
    },
    animation: { duration: 1000, easing: 'easeOutQuad' },
  };

  // If no conservation data available
  if (labels.length === 0) {
    return <div className="text-center p-4">No conservation status data available</div>;
  }

  return (
    <div style={{ width: '500px', height: '350px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AnimalStats; // Changed from AnimalDietStats to AnimalStats