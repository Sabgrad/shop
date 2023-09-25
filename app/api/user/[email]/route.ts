import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  email: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    const { email } = params

    if (!email) {
      console.log('no email')
      return null
    }

    const user = await prisma.user.findFirst({
      where: {
        email
      },
      select: {
        email: true,
        id: true,
        name: true,
      }
    })

    return NextResponse.json(user)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}