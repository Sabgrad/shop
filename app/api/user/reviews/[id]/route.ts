import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {

  const { id } = params

  if (!id) {
    return NextResponse.json({ message: `no email}`, satus: 500 })
  }

  try {
    const review = await prisma.review.findMany({
      where: {
        userId: id
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        text: true,
        rating: true,
        productId: true,
      }
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ message: `Error user/review GET -> Error: ${error}`, satus: 500 })
  }
}