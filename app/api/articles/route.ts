import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/articles
 * Get all articles with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const published = searchParams.get('published')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')

    const where: any = {}

    if (category && category !== 'all') {
      where.category = category
    }

    if (published !== null) {
      where.published = published === 'true'
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    })

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Get articles error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/articles
 * Create a new article
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      content,
      category,
      tags,
      image,
      images,
      pdfUrl,
      author,
      published = true,
    } = body

    // Validate required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      )
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        category,
        tags: tags || [],
        image,
        images: images || [],
        pdfUrl,
        author,
        published,
      },
    })

    return NextResponse.json({ article }, { status: 201 })
  } catch (error) {
    console.error('Create article error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
