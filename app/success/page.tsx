'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const makeRequest = async (intentId: string) => {
  try {
    await axios.put(`/api/confirm/${intentId}`)

  } catch (error) {
    console.log(error)
  }
}

export default function Success() {

  const searchParams = useSearchParams()
  const payment_intent = searchParams.get('payment_intent')
  const router = useRouter()

  useEffect(() => {
    if (payment_intent) {
      makeRequest(payment_intent).then(() => router.push('/user'))
    }
  }, [payment_intent])

  return (
    <div>
      Success page
    </div>
  )
}