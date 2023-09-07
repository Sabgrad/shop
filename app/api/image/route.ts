import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { path, productId, publicId } = body

    console.log(body)

    const count = await prisma.image.count({
      where: {
        productId: productId
      }
    })

    if (count >= 5) {
      return NextResponse.json({ error: 'Max count of image for this product' }, { status: 500 })
    }

    const newImage = await prisma.image.create({
      data: {
        path: path,
        publicId: publicId,
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
