// components/AnimalDietStats.js
"use client";

import React from 'react';
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
import { animals } from '../data/animals';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnimalDietStats = () => {
  // Count animals by diet type
  const dietCounts = animals.reduce((acc, animal) => {
    if (animal.diet.toLowerCase().includes('carnivorous')) {
      acc['Carnivorous'] = (acc['Carnivorous'] || 0) + 1;
    } else if (animal.diet.toLowerCase().includes('herbivorous')) {
      acc['Herbivorous'] = (acc['Herbivorous'] || 0) + 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(dietCounts);
  const data = Object.values(dietCounts);

  // Use formal colors: subtle red and blue
  const colors = [
    'rgba(178, 34, 34, 0.7)',  // firebrick
    'rgba(30, 144, 255, 0.7)', // dodgerblue
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
      },
    },
    animation: { duration: 1000, easing: 'easeOutQuad' },
  };

  return (
    <div style={{ width: '500px', height: '350px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AnimalDietStats;
