import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {

  const body = await request.json()
  const { text, rating, productId, userId } = body

  try {
    const newReview = await prisma.review.create({
      data: {
        text,
        rating,
        productId,
        userId
      }
    })

    return NextResponse.json(newReview)
  } catch (error) {
    return NextResponse.json({ message: `Error review POST -> Error: ${error}`, satus: 500 })
  }
}