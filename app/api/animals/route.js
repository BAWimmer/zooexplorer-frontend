// This file handles the API routes for animals.
// It includes GET and POST methods to fetch all animals and create a new animal respectively.

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all animals
export async function GET() {
  try {
    const animals = await prisma.animal.findMany();
    return NextResponse.json(animals);
  } catch (error) {
    console.error('Error fetching animals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch animals' },
      { status: 500 }
    );
  }
}

// Create new animal (Admin only - protected by middleware)
export async function POST(request) {
  try {
    const data = await request.json();
    
    const newAnimal = await prisma.animal.create({
      data: {
        name: data.name,
        description: data.description,
        habitat: data.habitat,
        habitatTypes: data.habitatTypes || [],
        diet: data.diet,
        conservationStatus: data.conservationStatus,
        lifespan: data.lifespan,
        interestingFact: data.interestingFact,
        imageUrl: data.imageUrl,
      },
    });
    
    return NextResponse.json(newAnimal, { status: 201 });
  } catch (error) {
    console.error('Error creating animal:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create animal' },
      { status: 500 }
    );
  }
}