import prisma from '@/lib/prismadb'

export const PUT = async (request: Request, { params }: { params: { intentId: string } }) => {

  const { intentId } = params;

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId
      },
      data: {
        paid: true
      }
    })

  } catch (error) {
    console.log(error)
  }
}