import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/innovations
 * Get all innovations with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const country = searchParams.get('country')
    const featured = searchParams.get('featured')
    const stage = searchParams.get('stage')
    const limit = searchParams.get('limit')

    const where: any = {}

    if (category) {
      where.category = category
    }

    if (country) {
      where.country = country
    }

    if (featured !== null) {
      where.featured = featured === 'true'
    }

    if (stage) {
      where.stage = stage
    }

    const innovations = await prisma.innovation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ innovations })
  } catch (error) {
    console.error('Get innovations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/innovations
 * Create a new innovation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      category,
      country,
      stage,
      image,
      website,
      founders,
      yearFounded,
      impact,
      featured = false,
    } = body

    // Validate required fields
    if (!name || !description || !category || !country) {
      return NextResponse.json(
        { error: 'Name, description, category, and country are required' },
        { status: 400 }
      )
    }

    const innovation = await prisma.innovation.create({
      data: {
        name,
        description,
        category,
        country,
        stage: stage || 'research',
        image,
        website,
        founders: founders || [],
        yearFounded,
        impact,
        featured,
      },
    })

    return NextResponse.json({ innovation }, { status: 201 })
  } catch (error) {
    console.error('Create innovation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
