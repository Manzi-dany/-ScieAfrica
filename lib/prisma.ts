// Mock Prisma client for deployment without database
// To enable full database functionality, set up PostgreSQL and update this file

// Pre-hashed password for 'Kabayamarcel1970@#'
const ADMIN_PASSWORD_HASH = '$2b$10$.6KuYLhM6VxieWWURVU5JubQ1gHrhSw5Cl2gIm9/AORkll9fNFD5W'

const mockData = {
  articles: [],
  scientists: [],
  innovations: [],
  stats: [],
  galleryImages: [],
  adminUsers: [
    {
      id: 'admin-1',
      email: 'manzidany72@gmail.com',
      passwordHash: ADMIN_PASSWORD_HASH,
      name: 'Admin User',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
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
    findUnique: async ({ where }: any) => {
      return mockData.adminUsers.find(user => user.email === where.email) || null
    },
    findMany: async () => mockData.adminUsers,
    create: async ({ data }: any) => {
      const newUser = { id: Date.now().toString(), ...data }
      mockData.adminUsers.push(newUser)
      return newUser
    },
    update: async ({ where, data }: any) => {
      const user = mockData.adminUsers.find(u => u.id === where.id)
      if (user) {
        Object.assign(user, data)
        return user
      }
      return null
    },
  },
  $connect: async () => {},
  $disconnect: async () => {},
}

export const prisma = mockPrisma as any
export default prisma
