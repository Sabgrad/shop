import prisma from '@/prisma/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {

    const body = await request.json()
    const { path, productId, publickId } = body

    const newImage = await prisma.image.create({
      data: {
        path,
        publickId,
        product: {
          connect: {
            id: productId
          }
        }
      }
    })

    return NextResponse.json(newImage)

  } catch (error) {
    return NextResponse.json(error)
  }
}