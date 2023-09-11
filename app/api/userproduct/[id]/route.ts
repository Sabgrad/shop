import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    const { id } = params

    if (!id) {
      console.log('no id')
      return null
    }

    const user = await prisma.product.findMany({
      where: {
        ownerId: id
      },
      include: {
        image: true
      }
    })

    return NextResponse.json(user)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}

export const DELETE = async (request: Request, { params }: { params: Params }) => {
  try {
    const { id } = params

    if (!id) {
      console.log('no id')
      return null
    }

    const deleteImages = await prisma.image.deleteMany({
      where: {
        productId: id
      }
    })

    const deleteProduct = await prisma.product.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json([deleteImages, deleteProduct])

  } catch (err: any) {
    return NextResponse.json(err)
  }
}