// Mock Prisma client for deployment without database
// To enable full database functionality, set up PostgreSQL and update this file

const mockData = {
  articles: [],
  scientists: [],
  innovations: [],
  stats: [],
  galleryImages: [],
  adminUsers: [],
}

const mockPrisma = {
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
}

export const prisma = mockPrisma as any
export default prisma
