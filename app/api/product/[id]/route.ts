import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {

  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'No id' }, { status: 500 })
  }

  const updateProduct = await prisma.product.findUnique({
    where: {
      id
    }
  })

  return NextResponse.json(updateProduct)
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {

  const { id } = params
  const body = await request.json()
  const { name, description, category, price, discount, actual_price } = body

  if (!id) {
    return NextResponse.json({ error: 'No id' }, { status: 500 })
  }

  const updateProduct = await prisma.product.update({
    where: {
      id
    },
    data: {
      name,
      description,
      category,
      price,
      discount,
      actual_price
    }
  })

  return NextResponse.json(updateProduct)
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