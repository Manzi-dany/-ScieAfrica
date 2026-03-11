import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/gallery
 * Get all gallery images with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    const where: any = {}

    if (category) {
      where.category = category
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { uploadedAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Get gallery error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/gallery
 * Add a new image to the gallery
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { src, alt, category } = body

    // Validate required fields
    if (!src) {
      return NextResponse.json(
        { error: 'Image source is required' },
        { status: 400 }
      )
    }

    const image = await prisma.galleryImage.create({
      data: {
        src,
        alt,
        category,
      },
    })

    return NextResponse.json({ image }, { status: 201 })
  } catch (error) {
    console.error('Create gallery image error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
