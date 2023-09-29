import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  email: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {

  const { email } = params

  if (!email) {
    return NextResponse.json({ message: `no email`, satus: 500 })
  }

  try {
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
  } catch (error) {
    return NextResponse.json({ message: `Error user/[email] GET -> Error: ${error}`, satus: 500 })
  }
}