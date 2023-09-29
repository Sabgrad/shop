'use client'

import axios from 'axios'
import React, { useEffect } from 'react'
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from '@/components/checkout-form';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const makeRequest = async (order_id: string) => {
  const res = await axios.post(`/api/create-intent/${order_id}`)

  return res.data
}

export default function PayPage({ params }: { params: { id: string } }) {

  const [clientSecret, setClientSecret] = React.useState("");

  const { id } = params

  useEffect(() => {
    if (id) {
      makeRequest(id)
        .then((res) => setClientSecret(res.client_secret))
    }
  }, [id])

  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: 'stripe'
    }
  }

  return (
    <div className='p-2'>
      {clientSecret &&
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      }
    </div>
  )
}