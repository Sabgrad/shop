'use client'

import { useUserContext } from '@/context/user-context'
import { categorys } from '@/lib/data'
import axios from 'axios'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

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
    setIsDisable(true)
    axios.post('/api/product', {
      ...data,
      userId: user?.id
    })
      .then(() => { triggerProductRequest() })
      .finally(() => setIsDisable(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <textarea
          placeholder='Name'
          {...register('name', {
            required: true,
            minLength: 10,
            maxLength: 256,
          })}
          className='p-1 border border-black/40 rounded-lg'
        />
        <textarea
          placeholder='Description'
          {...register('description', {
            required: true,
            minLength: 10,
            maxLength: 2048,
          })}
          className='p-1 border border-black/40 rounded-lg'
        />
        <select
          className='p-1 border border-black/40 rounded-lg'
          {...register('category', {
            required: true,
          })}
        >
          {
            categorys.map((category) =>
              <optgroup key={category.title} label={category.title}>
                {
                  category.subCategory.map((subCategory) =>
                    <option key={subCategory.title} value={subCategory.title}>
                      {subCategory.title}
                    </option>
                  )
                }
              </optgroup>
            )
          }
        </select>
        <input
          placeholder='price'
          {...register('price', {
            required: true,
            valueAsNumber: true,
            validate: (v) => v >= 100 && v <= 999999
          })}
          className='p-1 border border-black/40 rounded-lg'
        />
        <input
          placeholder='discount'
          {...register('discount', {
            required: true,
            valueAsNumber: true,
            validate: (v) => v >= 10 && v <= 80 || v === 0
          })}
          className='p-1 border border-black/40 rounded-lg'
        />
      </div>
      <button type='submit' disabled={isDisable} className='w-full p-1 bg-green-500/50 hover:bg-green-500 rounded-lg transition-all'>
        Create Product
      </button>
    </form>
  )
}
