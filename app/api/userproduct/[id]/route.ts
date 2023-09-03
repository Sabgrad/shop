import prisma from '@/prisma/prismadb'
import { NextRequest, NextResponse } from 'next/server'

type Params = {
  id: string
}

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
  try {
    const { id } = params

    if (!id) {
      console.log('no id')
      return null
    }

    const user = await prisma.product.findMany({
      where: {
        ownerId: id
      }
    })

    return NextResponse.json(user)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}