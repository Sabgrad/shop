import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {

  const { id } = params
  const body = await request.json()
  const { name, description, category, price, discount } = body

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
      discount
    }
  })

  return NextResponse.json(updateProduct)
}