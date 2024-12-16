import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient | undefined 
};

const createPrismaClient = () => {
  console.log('Database URL:', process.env.DATABASE_URL);
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;