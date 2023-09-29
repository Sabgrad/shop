import bcrypt from 'bcrypt'

import prisma from '@/lib/prismadb'

import { NextResponse } from 'next/server'

const POST = async (request: Request) => {
  const body = await request.json();
  const {
    email,
    name,
    password
  } = body

  if (!email || !password || !name) {
    return NextResponse.json({ message: `Missing info`, satus: 500 })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        images: [],
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: `Error register POST -> Error: ${error}`, satus: 500 })
  }
}

export { POST }