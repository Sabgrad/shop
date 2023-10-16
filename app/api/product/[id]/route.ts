import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {

  const { id } = params

  if (!id) {
    return NextResponse.json({ message: 'no id' }, { status: 500 })
  }

  try {
    const getProduct = await prisma.product.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        description: true,
        price: true,
        discount: true,
        actual_price: true,
        category: true,
        images: true,
        hide: true,
        ownerId: true,
        reviews: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            text: true,
            rating: true,
            user: {
              select: {
                name: true,
                id: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(getProduct)
  } catch (error) {
    return NextResponse.json({ message: `Error product/[id] GET -> Error: ${error}`, satus: 500 })
  }
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {

  const body = await request.json()
  const { name, description, category, price, discount, actual_price, images } = body
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'no id' }, { status: 500 })
  }

  try {
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
        actual_price,
        images
      }
    })

    return NextResponse.json(updateProduct)
  } catch (error) {
    return NextResponse.json({ message: `Error product/[id] PATCH -> Error: ${error}`, satus: 500 })
  }
}

export const DELETE = async (request: Request, { params }: { params: Params }) => {

  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'no id' }, { status: 500 })
  }

  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id
      }
    })

    return NextResponse.json(deleteProduct)
  } catch (error) {
    return NextResponse.json({ message: `Error product/[id] DELETE -> Error: ${error}`, satus: 500 })
  }
}