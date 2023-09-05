'use client'

import { useUserContext } from '@/context/user-context'
import { category } from '@/lib/data'
import axios from 'axios'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export default function ProductCreateForm() {

  const { user, triggerProductRequest } = useUserContext()

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
    axios.post('/api/product', {
      ...data,
      userId: user?.id
    })
      .then(() => { triggerProductRequest() })
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
          className='p-1 border border-black/40'
        />
        <textarea
          placeholder='Description'
          {...register('description', {
            required: true,
            minLength: 10,
            maxLength: 2048,
          })}
          className='p-1 border border-black/40'
        />
        <select
          {...register('category', {
            required: true,
          })}
        >
          {
            category.map((mainCategory) =>
              <optgroup label={mainCategory.title} key={mainCategory.title}>
                {
                  mainCategory.subCategory.map((subCategory) =>
                    'subCategory' in subCategory ?
                      subCategory.subCategory?.map((item) =>
                        <option key={item.title} value={item.title}>
                          {item.title}
                        </option>
                      )
                      :
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
          className='p-1 border border-black/40'
        />
        <input
          placeholder='discount'
          {...register('discount', {
            required: true,
            valueAsNumber: true,
            validate: (v) => v >= 10 && v <= 80 || v === 0
          })}
          className='p-1 border border-black/40'
        />
      </div>
      <button type='submit' className='bg-gray-500'>
        Create Product
      </button>
    </form>
  )
}
