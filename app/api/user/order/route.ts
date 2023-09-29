import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {

  const url = request.url
  const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
  const email = params.get('user_email')

  if (!email) {
    return NextResponse.json({ message: `no email}`, satus: 500 })
  }

  try {
    const user = await prisma.order.findMany({
      where: {
        customerEmail: email
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: `Error user/order GET -> Error: ${error}`, satus: 500 })
  }
}