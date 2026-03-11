import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/scientists/[id]
 * Get a single scientist profile by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const scientist = await prisma.scientistProfile.findUnique({
      where: { id },
    })

    if (!scientist) {
      return NextResponse.json(
        { error: 'Scientist profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ scientist })
  } catch (error) {
    console.error('Get scientist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/scientists/[id]
 * Update a scientist profile
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const scientist = await prisma.scientistProfile.update({
      where: { id },
      data: body,
    })

    return NextResponse.json({ scientist })
  } catch (error) {
    console.error('Update scientist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/scientists/[id]
 * Delete a scientist profile
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.scientistProfile.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete scientist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
