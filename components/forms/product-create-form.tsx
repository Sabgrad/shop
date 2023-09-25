'use client'

import { useUserContext } from '@/context/user-context'
import axios from 'axios'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import TextArea from '../input/textarea'
import Input from '../input/input'
import Btn from '../buttons/btn'
import SelectCategory from '../input/select-category'

export default function ProductCreateForm() {

  const { user, triggerProductRequest } = useUserContext()

  const [isDisable, setIsDisable] = useState(false)

  const {
    handleSubmit,
    reset,
    register,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      discount: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { price, discount } = data
    const actual_price = Math.round(price - (price * discount / 100))
    setIsDisable(true)
    axios.post('/api/product', {
      ...data,
      actual_price,
      userId: user?.id
    })
      .then(() => { triggerProductRequest() })
      .finally(() => setIsDisable(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <TextArea placeholder='Name' id='name' required register={register} minLength={10} maxLength={300} />
        <TextArea placeholder='Description' id='description' required register={register} />
        <SelectCategory id='category' register={register} required />
        <Input id={'price'} type={'number'} placeholder='Price' register={register} required valueAsNumber validate={(v) => v >= 100 && v <= 999999} />
        <Input id={'discount'} type={'number'} placeholder='Discount' register={register} required valueAsNumber validate={(v) => v >= 10 && v <= 80 || v === 0} />
      </div>
      <Btn
        type='submit'
        disabled={isDisable}
        className='w-full p-1 bg-maincolor-100/50 hover:bg-maincolor-100 rounded-lg transition-all'
      >
        Create Product
      </Btn>
    </form>
  )
}