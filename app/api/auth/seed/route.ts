import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

/**
 * POST /api/auth/seed
 * Create initial admin user (for setup purposes)
 * This endpoint should be disabled in production after initial setup
 */
export async function POST(request: NextRequest) {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: 'manzidany72@gmail.com' },
    })

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists' },
        { status: 200 }
      )
    }

    // Create admin user with hashed password
    const password = 'Kabayamarcel1970@#'
    const passwordHash = await bcrypt.hash(password, 10)

    const admin = await prisma.adminUser.create({
      data: {
        email: 'manzidany72@gmail.com',
        passwordHash: passwordHash,
        name: 'Admin User',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
