import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/innovations/[id]
 * Get a single innovation by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const innovation = await prisma.innovation.findUnique({
      where: { id },
    })

    if (!innovation) {
      return NextResponse.json(
        { error: 'Innovation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ innovation })
  } catch (error) {
    console.error('Get innovation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/innovations/[id]
 * Update an innovation
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const innovation = await prisma.innovation.update({
      where: { id },
      data: body,
    })

    return NextResponse.json({ innovation })
  } catch (error) {
    console.error('Update innovation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/innovations/[id]
 * Delete an innovation
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.innovation.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete innovation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
