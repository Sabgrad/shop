'use client'

import { ProductType } from '@/types/types'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import React from 'react'
import noimage from '@/public/noimage.jpg'
import axios from 'axios'
import { useUserContext } from '@/context/user-context'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { category } from '@/lib/data'

type ProductUpdaterFormProps = {
  product: ProductType
}

export default function ProductUpdaterForm({
  product
}: ProductUpdaterFormProps) {

  const { triggerProductRequest } = useUserContext()

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

  const handleUpload = (result: any) => {
    console.log(result)
    axios.post('/api/image', {
      path: result.info.secure_url,
      publicId: result.info.publick_id,
      productId: product.id
    })
      .then(() => triggerProductRequest())
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

  }

  return (
    <>
      <div className='flex gap-2'>
        <div className='gap-2 flex flex-col'>
          {product.image.map((el) =>
            <div key={el.id} className='flex w-16 h-16 justify-start items-center relative bg-gray-200'>
              <Image src={el.path} alt='image' width={64} height={64} />
            </div>
          )}
        </div>
        <div>
          <CldUploadButton onUpload={handleUpload} options={{ maxFiles: 1 }} uploadPreset='niudip3t'>
            {
              product.image !== null && product.image.length ?
                <Image src={product.image.at(0)?.path as string} alt='product image' width={234} height={234} />
                :
                <Image src={noimage} alt='product image' width={234} height={234} />
            }
          </CldUploadButton>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
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
      </form>
    </>
  )
}
