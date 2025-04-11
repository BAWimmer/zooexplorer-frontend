// This file contains the API routes for handling user-related operations such as fetching, updating, and deleting user data. It uses Prisma for database interactions and NextAuth for authentication.

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; 
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// Get single user
export async function GET(request, { params }) {
  params = await params;
  const { id } = params;
  
  const session = await getServerSession(authOptions);
  
  // Only allow admin or the user themselves to access
  if (!session || (session.user.id !== id && session.user.role !== 'Admin')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
        role: true,
        createdAt: true,
        location: true,
        bio: true,
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// Update user (Admin only)
export async function PUT(request, { params }) {
  // Await params if it's a promise
  params = await params;
  const { id } = params;
  
  // Check for admin privileges
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'Admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    
    // Only allow updating certain fields
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        location: data.location,
        bio: data.bio,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
        role: true,
        location: true,
        bio: true,
      }
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// Delete user (Admin only)
export async function DELETE(request, { params }) {
  // Await params if it's a promise
  params = await params;
  const { id } = params;
  
  // Check for admin privileges
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'Admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}