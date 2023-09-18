import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {

    const body = await request.json()
    const { amount,orderId, productId } = body

    const newOrderItem = await prisma.orderItem.create({
      data: {
        amount,
        product: {
          connect: {
            id: productId
          }
        },
        order: {
          connect: {
            id: orderId
          }
        }
      }
    })

    return NextResponse.json(newOrderItem)

  } catch (error) {
    return NextResponse.json(error)
  }
}