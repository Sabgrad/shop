import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {

  try {
    const url = request.url
    const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
    const email = params.get('userEmail')

    if (!email) {
      console.log('no id')
      return null
    }

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

  } catch (err: any) {
    return NextResponse.json(err)
  }
}