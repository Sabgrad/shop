import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request: Request, { params }: { params: { id: string } }) => {

  const { id } = params

  console.log(id)

  try {
    const getOrder = await prisma.order.findUnique({
      where: {
        id: id
      },
      select: {
        price: true,
        paid: true,
      }
    })

    return NextResponse.json(getOrder)
  } catch (error) {
    return NextResponse.json({ message: `Error order/[id] GET -> Error: ${error}`, satus: 500 })
  }
}

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {

  const body = await request.json()
  const { price } = body
  const { id } = params

  try {
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
    return NextResponse.json({ message: `Error order/[id] PATCH -> Error: ${error}`, satus: 500 })
  }
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

  const { id } = params

  try {
    const deleteOrder = await prisma.order.delete({
      where: {
        id: id
      },
      include: {
        products: true
      }
    })

    return NextResponse.json(deleteOrder)

  } catch (error) {
    return NextResponse.json({ message: `Error order/[id] DELETE -> Error: ${error}`, satus: 500 })
  }
}