import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/stats/aggregated
 * Get aggregated research statistics for data visualizations
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'publications-by-country'
    const year = searchParams.get('year')
    const category = searchParams.get('category')

    let data: any = {}

    switch (type) {
      case 'publications-by-country':
        // Get total publications by country for the latest year
        const latestYear = year ? parseInt(year) : 2023
        const publicationsByCountry = await prisma.researchStats.groupBy({
          by: ['country'],
          where: {
            metric: 'publications',
            year: latestYear,
          },
          _sum: {
            value: true,
          },
          orderBy: {
            _sum: {
              value: 'desc',
            },
          },
          take: 10,
        })
        data = {
          labels: publicationsByCountry.map((item) => item.country),
          values: publicationsByCountry.map((item) => item._sum.value || 0),
        }
        break

      case 'growth-by-category':
        // Get growth trends by category over years
        const growthData = await prisma.researchStats.findMany({
          where: {
            metric: 'publications',
            category: category || { not: 'overall' },
          },
          orderBy: [{ year: 'asc' }],
        })
        // Group by category
        const groupedByCategory: Record<string, { years: number[]; values: number[] }> = {}
        growthData.forEach((stat) => {
          if (!groupedByCategory[stat.category]) {
            groupedByCategory[stat.category] = { years: [], values: [] }
          }
          groupedByCategory[stat.category].years.push(stat.year)
          groupedByCategory[stat.category].values.push(stat.value)
        })
        data = groupedByCategory
        break

      case 'funding-by-country':
        // Get research funding by country
        const fundingByCountry = await prisma.researchStats.groupBy({
          by: ['country'],
          where: {
            metric: 'funding',
            year: year ? parseInt(year) : 2023,
          },
          _sum: {
            value: true,
          },
          orderBy: {
            _sum: {
              value: 'desc',
            },
          },
          take: 10,
        })
        data = {
          labels: fundingByCountry.map((item) => item.country),
          values: fundingByCountry.map((item) => item._sum.value || 0),
        }
        break

      case 'patents-by-country':
        // Get patents by country
        const patentsByCountry = await prisma.researchStats.groupBy({
          by: ['country'],
          where: {
            metric: 'patents',
            year: year ? parseInt(year) : 2023,
          },
          _sum: {
            value: true,
          },
          orderBy: {
            _sum: {
              value: 'desc',
            },
          },
          take: 10,
        })
        data = {
          labels: patentsByCountry.map((item) => item.country),
          values: patentsByCountry.map((item) => item._sum.value || 0),
        }
        break

      case 'researchers-by-country':
        // Get researcher count by country
        const researchersByCountry = await prisma.researchStats.findMany({
          where: {
            metric: 'researchers',
            year: year ? parseInt(year) : 2023,
          },
          orderBy: {
            value: 'desc',
          },
          take: 10,
        })
        data = {
          labels: researchersByCountry.map((item) => item.country),
          values: researchersByCountry.map((item) => item.value),
        }
        break

      case 'category-distribution':
        // Get distribution of research by category
        const categoryDist = await prisma.researchStats.groupBy({
          by: ['category'],
          where: {
            metric: 'publications',
            year: year ? parseInt(year) : 2023,
            category: { not: 'overall' },
          },
          _sum: {
            value: true,
          },
        })
        data = {
          labels: categoryDist.map((item) => item.category),
          values: categoryDist.map((item) => item._sum.value || 0),
        }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid aggregation type' },
          { status: 400 }
        )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Get aggregated stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
