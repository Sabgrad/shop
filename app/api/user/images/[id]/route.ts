import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {

  const body = await request.json()
  const { images } = body
  const { id } = params

  if (!id) {
    return NextResponse.json({ message: `no id`, satus: 500 })
  }

  try {
    const updateImages = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        images: images
      }
    })
    return NextResponse.json(updateImages)
  } catch (error) {
    return NextResponse.json({ message: `Error product/images/[id] PATCH -> Error: ${error}`, satus: 500 })
  }
}