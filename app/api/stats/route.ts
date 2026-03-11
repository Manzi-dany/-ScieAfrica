import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/stats
 * Get research statistics with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const metric = searchParams.get('metric')
    const year = searchParams.get('year')
    const country = searchParams.get('country')

    const where: any = {}

    if (category) {
      where.category = category
    }

    if (metric) {
      where.metric = metric
    }

    if (year) {
      where.year = parseInt(year)
    }

    if (country) {
      where.country = country
    }

    const stats = await prisma.researchStats.findMany({
      where,
      orderBy: [{ year: 'desc' }, { value: 'desc' }],
    })

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/stats
 * Create a new research statistic
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, metric, value, year, country, source } = body

    // Validate required fields
    if (!category || !metric || value === undefined || !year) {
      return NextResponse.json(
        { error: 'Category, metric, value, and year are required' },
        { status: 400 }
      )
    }

    const stat = await prisma.researchStats.create({
      data: {
        category,
        metric,
        value: parseFloat(value),
        year: parseInt(year),
        country,
        source,
      },
    })

    return NextResponse.json({ stat }, { status: 201 })
  } catch (error) {
    console.error('Create stat error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
