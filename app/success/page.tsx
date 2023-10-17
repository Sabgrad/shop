'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSuccessPayment } from '@/hooks/tanstack-query/useMutation-hooks'
import { useStringStore } from '@/context/zustand'

export default function Success() {

  const searchParams = useSearchParams()
  const payment_intent = searchParams.get('payment_intent')
  const router = useRouter()
  const { setCurrentSection } = useStringStore()

  const { mutate: succesPayment } = useSuccessPayment({ setCurrentSection, router })

  useEffect(() => {
    if (payment_intent) {
      succesPayment(payment_intent)
    }
  }, [payment_intent, succesPayment])

  return (
    <div className='flex justify-center items-center'>
      Please wait while we finish payment
    </div>
  )
}