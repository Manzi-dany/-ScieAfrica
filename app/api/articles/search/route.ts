import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/articles/search
 * Search articles by query string
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const where: any = {
      published: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
      ],
    }

    if (category && category !== 'all') {
      where.category = category
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Search articles error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
