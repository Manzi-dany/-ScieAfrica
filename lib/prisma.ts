import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.warn('DATABASE_URL not set, using mock data')
    // Fallback to mock if no database URL (for development without DB)
    return createMockPrisma()
  }

  const pool = new Pool({ connectionString: databaseUrl })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

function createMockPrisma() {
  const mockData = {
    articles: [],
    scientists: [],
    innovations: [],
    stats: [],
    galleryImages: [],
    adminUsers: [],
  }

  return {
    article: {
      findMany: async () => mockData.articles,
      findUnique: async () => null,
      create: async ({ data }: any) => ({ id: Date.now().toString(), ...data }),
      update: async ({ data }: any) => data,
      delete: async () => ({}),
    },
    scientistProfile: {
      findMany: async () => mockData.scientists,
      findUnique: async () => null,
      create: async ({ data }: any) => ({ id: Date.now().toString(), ...data }),
      update: async ({ data }: any) => data,
      delete: async () => ({}),
    },
    innovation: {
      findMany: async () => mockData.innovations,
      findUnique: async () => null,
      create: async ({ data }: any) => ({ id: Date.now().toString(), ...data }),
      update: async ({ data }: any) => data,
      delete: async () => ({}),
    },
    researchStats: {
      findMany: async () => mockData.stats,
      groupBy: async () => [],
      create: async ({ data }: any) => ({ id: Date.now().toString(), ...data }),
    },
    galleryImage: {
      findMany: async () => mockData.galleryImages,
      create: async ({ data }: any) => ({ id: Date.now().toString(), ...data }),
      delete: async () => ({}),
    },
    adminUser: {
      findUnique: async () => null,
      findMany: async () => mockData.adminUsers,
      create: async ({ data }: any) => ({ id: Date.now().toString(), ...data }),
      update: async ({ data }: any) => data,
    },
    $connect: async () => {},
    $disconnect: async () => {},
  } as any
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
