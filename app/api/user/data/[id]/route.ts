import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {

  const { id } = params
  const body = await request.json()
  const { images } = body

  console.log('images -> ', images, id)

  if (!id) {
    console.log('no id')
    return null
  }

  const updateImages = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      images: images
    }
  })

  return NextResponse.json(updateImages)
}