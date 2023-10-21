import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {

  const url = request.url
  const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
  const ids = params.get('ids')

  if (!ids) {
    return NextResponse.json({ message: 'no ids' }, { status: 500 })
  }

  const arrayOfIds = ids.split(',').map((id) => ({ id: id }))

  try {
    const getProducts = await prisma.product.findMany({
      where: {
        OR: arrayOfIds,
        hide: false
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
      }
    })

    return NextResponse.json(getProducts)
  } catch (error) {
    return NextResponse.json({ message: `Error product/ids GET -> Error: ${error}`, satus: 500 })
  }
}