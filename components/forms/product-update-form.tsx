'use client'

import { ProductType } from '@/types/types'
import React, { useState } from 'react'
import axios from 'axios'
import { useUserContext } from '@/context/user-context'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { categorys } from '@/lib/data'
import { deleteCloudinrayImage } from '@/action/deleteCloudinaryImage'
import ImageComponent from '../images/image-component'

type ProductUpdaterFormProps = {
  product: ProductType
}

export default function ProductUpdaterForm({
  product,
}: ProductUpdaterFormProps) {

  const { triggerProductRequest, isLoading } = useUserContext()

  const [isDisable, setIsDisable] = useState(false)

  const {
    register, handleSubmit
  } = useForm<FieldValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      discount: product.discount,
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsDisable(true)
    const { name, description, price, category, discount } = data
    axios.patch(`/api/product/${product.id}`, {
      name, description, price, category, discount
    })
      .then(() => triggerProductRequest())
      .finally(() => setIsDisable(false))
  }

  const handleDeleteProduct = () => {
    setIsDisable(true)
    axios.delete(`/api/product/${product.id}`)
      .then(() => {
        product.image.forEach((el) => deleteCloudinrayImage(el.publicId))
      })
      .then(() => triggerProductRequest())
      .catch(() => setIsDisable(false))
  }

  return (
    <>
      <ImageComponent
        type='update'
        productId={product.id}
        images={product.image}
        isDisable={isDisable || isLoading}
        setIsDisable={setIsDisable}
        triggerProductRequest={triggerProductRequest}
      />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full'>
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
        <button
          disabled={isDisable}
          type='submit'
          className='w-full p-1 bg-green-500/50 hover:bg-green-500 rounded-lg transition-all'
        >
          Submit changes
        </button>
        <button
          disabled={isDisable}
          type='button'
          className='w-full p-1 bg-red-500/50 hover:bg-red-500 rounded-lg relative transition-all'
          onClick={() => handleDeleteProduct()}
        >
          Delete product
        </button>
      </form>
    </>
  )
}