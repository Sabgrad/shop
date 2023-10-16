'use client'

import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import TextArea from '../input/textarea'
import { useCreateReview } from '@/hooks/tanstack-query/useMutation-hooks'
import Btn from '../buttons/btn'
import { useRouter } from 'next/navigation'

type ReviewFormProps = {
  productId: string
  userId: string
}

export default function ReviewForm({
  productId,
  userId
}: ReviewFormProps) {

  const router = useRouter()
  const { mutate: createReview } = useCreateReview(router.refresh)

  const {
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    defaultValues: {
      text: '',
      rating: 5,
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { text, rating } = data
    createReview({
      text,
      rating,
      productId,
      userId
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-maincolor-200'>
      <TextArea placeholder='Review' id='text' required register={register} minLength={30} maxLength={600} className='w-full max-w-[40rem] min-h-[10rem]'/>
      <Btn type='submit'>
        OK
      </Btn>
    </form>
  )
}