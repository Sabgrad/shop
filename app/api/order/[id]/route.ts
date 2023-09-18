import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params

    const newOrder = await prisma.order.delete({
      where: {
        id: id
      },
      include: {
        products: true
      }
    })

    return NextResponse.json(newOrder)

  } catch (error) {
    return NextResponse.json(error)
  }
}