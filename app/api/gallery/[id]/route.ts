import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * DELETE /api/gallery/[id]
 * Delete a gallery image
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.galleryImage.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete gallery image error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
