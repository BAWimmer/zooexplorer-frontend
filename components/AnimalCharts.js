// Animal Chart component for displaying animal statistics and diet statistics
"use client";

import React from 'react';
import AnimalStats from './AnimalStats';
import AnimalDietStats from './AnimalDietStats';

const AnimalCharts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Animal Data Visualizations
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div>
          <AnimalStats />
        </div>
        <div>
          <AnimalDietStats />
        </div>
      </div>
    </div>
  );
};

export default AnimalCharts;
