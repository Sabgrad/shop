import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {

  const url = request.url
  const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
  const page = Number(params.get('page')) - 1
  const category = params.get('category')
  const min = Number(params.get('min'))
  const max = Number(params.get('max'))
  const sortBy = params.get('sortBy')
  const orderBy = params.get('orderBy')

  try {
    const getProducts = await prisma.product.findMany({
      skip: page * Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE),
      take: Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE),
      orderBy: [
        sortBy === 'price'
          ?
          {
            price: orderBy === 'desc' ? 'desc' : 'asc'
          }
          :
          {

          }
      ],
      where: {
        hide: false,
        category: category || undefined,
        price: {
          gte: min,
          lte: max < min ? min : max,
        }
      },
    })

    return NextResponse.json(getProducts)
  } catch (error) {
    return NextResponse.json({ message: `Error product GET -> Error: ${error}`, satus: 500 })
  }
}

export const POST = async (request: Request) => {

  const body = await request.json()
  const { userId, name, description, price, category, discount, actual_price } = body

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        discount,
        actual_price,
        hide: false,
        images: [],
        owner: {
          connect: {
            id: userId
          }
        },
      }
    })

    return NextResponse.json(newProduct)
  } catch (error) {
    return NextResponse.json({ message: `Error product POST -> Error: ${error}`, satus: 500 })
  }
}