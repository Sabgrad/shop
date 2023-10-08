'use client'

import { useUserPageCurrentSectionContext } from '@/context/user-current-section'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSuccessPayment } from '@/hooks/tanstack-query/useMutation-hooks'

export default function Success() {

  const searchParams = useSearchParams()
  const payment_intent = searchParams.get('payment_intent')
  const router = useRouter()
  const { setCurrentSection } = useUserPageCurrentSectionContext()

  const { mutate: succesPayment } = useSuccessPayment({ setCurrentSection, router })

  useEffect(() => {
    if (payment_intent) {
      succesPayment(payment_intent)
    }
  }, [payment_intent])

  return (
    <div className='flex justify-center items-center'>
      Please wait while we finish payment
    </div>
  )
}