import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    
    // Validate the required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Create a new contact message in the database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || '',
        message,
      },
    });
    
    return NextResponse.json(
      { success: true, contact: contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'Failed to save contact message' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}