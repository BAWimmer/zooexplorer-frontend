import { PrismaClient } from '@prisma/client';

// Create a single instance of Prisma Client to be used across the app
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;