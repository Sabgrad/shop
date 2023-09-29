import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server';

export const PATCH = async (request: Request, { params }: { params: { intent_id: string } }) => {

  const { intent_id } = params;

  try {
    await prisma.order.updateMany({
      where: {
        intent_id: intent_id,
      },
      data: {
        paid: true
      }
    })

    return NextResponse.json({ message: `Succes confirm payment`, status: 200 })
  } catch (error) {
    return NextResponse.json({ message: `Error confirm/[intent_id] PATCH -> Error: ${error}`, status: 500 })
  }
}