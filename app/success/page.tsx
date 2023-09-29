'use client'

import { useUserPageCurrentSection } from '@/context/user-current-section'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const makeRequest = async (intentId: string) => {
  await axios.patch(`/api/confirm/${intentId}`)
}

export default function Success() {

  const searchParams = useSearchParams()
  const payment_intent = searchParams.get('payment_intent')
  const router = useRouter()
  const { setCurrentSection } = useUserPageCurrentSection()

  useEffect(() => {
    if (payment_intent) {
      makeRequest(payment_intent)
        .then(() => { setCurrentSection('My orders'), router.push('/user') })
    }
  }, [payment_intent])

  return (
    <div className='flex justify-center items-center'>
      Please wait while we finish payment
    </div>
  )
}