import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

type Params = {
  id: string
}

export const DELETE = async (request: Request, { params }: { params: Params }) => {
  try {
    const { id } = params

    await prisma.image.delete({
      where: { id },
    })

    return NextResponse.json('image Delete')

  } catch (err: any) {
    return NextResponse.json(err)
  }
}