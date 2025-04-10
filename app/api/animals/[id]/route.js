import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { id } = await context.params;
  
  try {
    const animal = await prisma.animal.findUnique({
      where: { id }
    });
    
    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(animal);
  } catch (error) {
    console.error('Error fetching animal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch animal' },
      { status: 500 }
    );
  }
}

// Update animal (Admin only - protected by middleware)
export async function PUT(request, context) {
  const { id } = await context.params;
  
  try {
    const data = await request.json();
    
    const updatedAnimal = await prisma.animal.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        habitat: data.habitat,
        habitatTypes: data.habitatTypes,
        diet: data.diet,
        conservationStatus: data.conservationStatus,
        lifespan: data.lifespan,
        interestingFact: data.interestingFact,
        imageUrl: data.imageUrl,
      },
    });
    
    return NextResponse.json(updatedAnimal);
  } catch (error) {
    console.error('Error updating animal:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update animal' },
      { status: 500 }
    );
  }
}

// Delete animal (Admin only - protected by middleware)
export async function DELETE(request, context) {
  const { id } = await context.params;
  
  try {
    await prisma.animal.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete animal' },
      { status: 500 }
    );
  }
}