import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server';

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (request: Request, { params }: { params: { order_id: string } }) => {

  const { order_id } = params

  if (!order_id) {
    return NextResponse.json({ message: `no order_id`, status: 500 })
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: order_id
      }
    })

    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: (order.price * 100 / 36.94).toFixed(0),
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.update({
        where: {
          id: order_id
        },
        data: {
          intent_id: paymentIntent.id
        }
      })

      return NextResponse.json(paymentIntent)
    } else {
      return NextResponse.json({ message: `Order not found`, status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ message: `Error create-intent/[order_id] POST -> Error: ${error}`, status: 500 })
  }
}