import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/scientists/featured
 * Get featured scientist profiles
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '4'

    const scientists = await prisma.scientistProfile.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
    })

    return NextResponse.json({ scientists })
  } catch (error) {
    console.error('Get featured scientists error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
