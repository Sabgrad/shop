import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'


export const GET = async (request: Request) => {
  try {
    const url = request.url
    const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
    const id = params.get('userId')

    if (!id) {
      console.log('no id')
      return null
    }

    const user = await prisma.product.findMany({
      where: {
        ownerId: id
      },
      include: {
        image: true
      }
    })

    return NextResponse.json(user)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}