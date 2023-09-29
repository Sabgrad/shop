import { NextResponse } from "next/server"
import prisma from '@/lib/prismadb'

type Params = {
  id: string
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {

  const body = await request.json()
  const { hide } = body
  const { id } = params

  if (!id) {
    return NextResponse.json({ error: 'no id' }, { status: 500 })
  }

  try {
    const updateProduct = await prisma.product.update({
      where: {
        id
      },
      data: {
        hide: hide
      }
    })

    return NextResponse.json(updateProduct)
  } catch (error) {
    return NextResponse.json({ message: `Error product/hide/[id] PATCH -> Error: ${error}`, satus: 500 })
  }
}