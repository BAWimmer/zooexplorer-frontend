import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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