import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {

    const body = await request.json()
    const { id, status, price } = body

    const newOrder = await prisma.order.create({
      data: {
        status,
        price,
        paid: false,
        customer: {
          connect: {
            id
          }
        }
      }
    })

    return NextResponse.json(newOrder)

  } catch (error) {
    return NextResponse.json(error)
  }
}