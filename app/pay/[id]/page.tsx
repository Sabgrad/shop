'use client'

import React, { useState } from 'react'
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '@/components/checkout-form';
import { useFetchOrderPayPage } from '@/hooks/tanstack-query/useQuery-hooks';
import { useCreateIntent } from '@/hooks/tanstack-query/useMutation-hooks';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PayPage({ params }: { params: { id: string } }) {

  const [clientSecret, setClientSecret] = useState("");

  const { id } = params

  const { mutate: createIntent, isLoading } = useCreateIntent({ setClientSecret })

  const { data: order, isFetching } = useFetchOrderPayPage({ id, createIntent })

  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: 'stripe'
    }
  }

  if (isFetching || isLoading) return (<>Loading ...</>)

  return (
    <>
      <div className='p-2'>
        {
          isFetching ?
            <>Getting order...</>
            :
            <span>Price: {order?.price}</span>
        }
        {
          isLoading ?
            <>Loading payment...</>
            :
            clientSecret ?
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
              :
              <>Something went wrong...</>
        }
      </div>
    </>
  )
}

function useFetchOrderPayPag(): { data: any; isFetching: any; } {
  throw new Error('Function not implemented.');
}
