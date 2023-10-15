'use client'

import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import TextArea from '../input/textarea'
import Input from '../input/input'
import Btn from '../buttons/btn'
import SelectCategory from '../input/select-category'
import toast from 'react-hot-toast'
import { CreateProductType } from '@/types/types'
import { useCreateProduct } from '@/hooks/tanstack-query/useMutation-hooks'
import { useFetchUser } from '@/hooks/tanstack-query/useQuery-hooks'

export default function ProductCreateForm() {

  const { data: user } = useFetchUser()

  const {
    handleSubmit,
    register,
    reset,
    formState: {
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

  const { mutate: createProduct, isLoading } = useCreateProduct({ reset })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!user) return toast.error('No user')
    const { price, discount } = data
    const createData = Object.assign(data, { actual_price: Math.round(price - (price * discount / 100)) }, { userId: user.id })
    createProduct(createData as CreateProductType)
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
        disabled={isLoading}
        className='w-full p-1 rounded-lg transition-all'
      >
        Create Product
      </Btn>
    </form>
  )
}