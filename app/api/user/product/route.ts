import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {

  const url = request.url
  const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
  const id = params.get('user_id')

  if (!id) {
    return NextResponse.json({ message: `no user_id`, satus: 500 })
  }

  try {
    const user = await prisma.product.findMany({
      where: {
        ownerId: id
      },

    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: `Error user/product GET -> Error: ${error}`, satus: 500 })
  }
}