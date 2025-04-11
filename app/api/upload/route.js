// This is a Next.js API route for handling image uploads for animals.  It saves the uploaded image to the public/images directory and returns the path for use in <img> tags.

import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create safe filename (remove special chars, spaces, etc.)
    const originalName = file.name;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension)
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase();
    const fileName = `${baseName}${extension}`;
    
    // Save to public/images directory
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    const filePath = path.join(imagesDir, fileName);
    
    await writeFile(filePath, buffer);
    
    // Return the path that can be used in <img> tags
    return NextResponse.json({ 
      success: true,
      filePath: `/images/${fileName}` 
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}