import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {

  const body = await request.json()
  const { email, status, price, products, options } = body

  try {
    const newOrder = await prisma.order.create({
      data: {
        status: status,
        price: price,
        paid: false,
        customer: {
          connect: {
            email: email
          }
        },
        products: {
          connect: products
        },
        options: options
      }
    })

    return NextResponse.json(newOrder)
  } catch (error) {
    return NextResponse.json({ message: `Error order POST -> Error: ${error}`, satus: 500 })
  }
}