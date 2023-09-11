import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {

  const url = request.url
  const params = new URLSearchParams(url.substring(url.indexOf('?') + 1))
  const category = params.get('category')
  const min = Number(params.get('min'))
  const max = Number(params.get('max'))

  try {

    const count = await prisma.product.count({
      where: {
        category: category || undefined,
        price: {
          gte: min,
          lte: max < min ? undefined : max,
        }
      },
    })

    return NextResponse.json(count)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}