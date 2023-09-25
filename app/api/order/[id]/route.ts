import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const body = await request.json()
    const { price } = body
    const { id } = params

    const patchOrderPrice = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        price: price,
      }
    })

    return NextResponse.json(patchOrderPrice)

  } catch (error) {
    return NextResponse.json(error)
  }
}

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