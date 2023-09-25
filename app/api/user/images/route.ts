import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    const url = request.url
    const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
    const id = params.get('userId')

    if (!id) {
      console.log('id not found')
      return null
    }

    const userImages = await prisma.user.findFirst({
      where: {
        id: id
      },
      select: {
        images: true
      }
    })

    return NextResponse.json(userImages)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}