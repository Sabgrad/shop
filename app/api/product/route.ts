import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {

    const body = await request.json()
    const { userId, name, description, price, category, discount } = body

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        discount,
        owner: {
          connect: {
            id: userId
          }
        },
      }
    })

    return NextResponse.json(newProduct)

  } catch (error) {
    return NextResponse.json(error)
  }
}