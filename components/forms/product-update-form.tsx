'use client'

import { ProductType } from '@/types/types'
import React, { useState } from 'react'
import axios from 'axios'
import { useUserContext } from '@/context/user-context'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { categorys } from '@/lib/data'
import { deleteCloudinrayImage } from '@/action/deleteCloudinaryImage'
import ImageComponent from '../images/image-component'
import TextArea from '../input/textarea'
import Input from '../input/input'
import Btn from '../buttons/btn'
import SelectCategory from '../input/select-category'

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
    const actual_price = Math.round(price - (price * discount / 100))
    axios.patch(`/api/product/${product.id}`, {
      name, description, price, category, discount, actual_price
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
        <TextArea placeholder='Name' id='name' required register={register} minLength={10} maxLength={300} />
        <TextArea placeholder='Description' id='description' required register={register} />
        <SelectCategory id='category' register={register} required/>
        <Input id={'price'} type={'number'} placeholder='Price' register={register} required valueAsNumber validate={(v) => v >= 100 && v <= 999999} />
        <Input id={'discount'} type={'number'} placeholder='Discount' register={register} required valueAsNumber validate={(v) => v >= 10 && v <= 80 || v === 0} />
        <Btn
          disabled={isDisable}
          type='submit'
          className='w-full p-1 bg-maincolor-100/50 hover:bg-maincolor-100 rounded-lg transition-all'
        >
          Submit changes
        </Btn>
        <Btn
          disabled={isDisable}
          className='w-full p-1 bg-maincolor-600/50 hover:bg-maincolor-600 rounded-lg relative transition-all'
          onClick={() => handleDeleteProduct()}
        >
          Delete product
        </Btn>
      </form>
    </>
  )
}