import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/scientists
 * Get all scientist profiles with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    const where: any = {}

    if (country) {
      where.country = country
    }

    if (featured !== null) {
      where.featured = featured === 'true'
    }

    const scientists = await prisma.scientistProfile.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ scientists })
  } catch (error) {
    console.error('Get scientists error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/scientists
 * Create a new scientist profile
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      title,
      institution,
      bio,
      researchAreas,
      image,
      linkedIn,
      twitter,
      publications,
      country,
      featured = false,
    } = body

    // Validate required fields
    if (!name || !institution || !bio || !country) {
      return NextResponse.json(
        { error: 'Name, institution, bio, and country are required' },
        { status: 400 }
      )
    }

    const scientist = await prisma.scientistProfile.create({
      data: {
        name,
        title,
        institution,
        bio,
        researchAreas: researchAreas || [],
        image,
        linkedIn,
        twitter,
        publications: publications || 0,
        country,
        featured,
      },
    })

    return NextResponse.json({ scientist }, { status: 201 })
  } catch (error) {
    console.error('Create scientist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
