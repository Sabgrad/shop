import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  page: number
}

export const GET = async (request: Request) => {
  const url = request.url
  const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
  const page = Number(params.get('page')) - 1
  const category = params.get('category')
  const min = Number(params.get('min'))
  const max = Number(params.get('max'))
  const sortBy = params.get('sortBy')
  const orderBy = params.get('orderBy')

  console.log(category, min, max, typeof (min), typeof (max))

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
      category: category || undefined,
      price: {
        gte: min,
        lte: max < min ? min : max,
      }
    },
    include: {
      image: true
    }
  })

  return NextResponse.json(getProducts)
}

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