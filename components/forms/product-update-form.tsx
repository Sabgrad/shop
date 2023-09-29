'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useUserContext } from '@/context/user-context'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import ImageComponent from '../images/image-component'
import TextArea from '../input/textarea'
import Input from '../input/input'
import Btn from '../buttons/btn'
import SelectCategory from '../input/select-category'
import { Product } from '@prisma/client'
import clsx from 'clsx'
import Image from 'next/image'
import toast from 'react-hot-toast'

type ProductUpdaterFormProps = {
  product: Product
  imagesData: string[]
}

export default function ProductUpdaterForm({
  product,
  imagesData
}: ProductUpdaterFormProps) {

  const { triggerProductRequest } = useUserContext()

  const [isDisable, setIsDisable] = useState(false)
  const [imagePicker, setImagePicker] = useState(false)
  const [select, setSelect] = useState<string[]>(product.images)

  const {
    register,
    handleSubmit
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
      name, description, price, category, discount, actual_price, images: select
    })
      .then(() => { triggerProductRequest(), toast.success('success updater') })
      .catch(() => toast.error('something went wrong'))
      .finally(() => setIsDisable(false))
  }

  const handleDeleteProduct = () => {
    setIsDisable(true)
    axios.delete(`/api/product/${product.id}`)
      .then(() => { triggerProductRequest(), toast.success('success delete') })
      .catch(() => toast.error('something went wrong'))
      .finally(() => setIsDisable(false))
  }

  const handleHiddeProduct = () => {
    setIsDisable(true)
    axios.patch(`/api/product/hide/${product.id}`, {
      hide: product.hide ? false : true
    })
      .then(() => { triggerProductRequest(), toast.success('success hide product') })
      .catch(() => toast.error('something went wrong'))
      .finally(() => setIsDisable(false))
  }

  return (
    <>
      {
        imagePicker &&
        <div className='flex flex-col fixed top-0 left-0 w-screen h-screen z-[951] bg-white p-2 overflow-y-auto'>
          <div className='flex'>
            <Btn className='ml-auto bg-maincolor-100' onClick={() => setImagePicker(false)}>
              Close
            </Btn>
          </div>
          {
            select.length > 0 &&
            <div className='flex gap-4 justify-evenly flex-wrap py-4 border-b-2 border-maincolor-950'>
              {
                select?.map((el) =>
                  <div
                    onClick={() => setSelect(prev => prev.filter((selectEl) => selectEl !== el))}
                    key={el}
                    className='h-[15rem] w-[15rem] flex justify-center items-center border-2 border-maincolor-100 relative p-1 rounded-lg transition-all hover:scale-110'
                  >
                    <Image src={el} alt='user_galery_images' className='object-contain' width={240} height={240} />
                  </div>
                )
              }
            </div>
          }
          <div className='flex gap-4 justify-evenly flex-wrap py-4'>
            {imagesData.length ?
              imagesData?.map((el) =>
                <div
                  onClick={() => select.find((selectEl) => selectEl === el) ? setSelect(prev => prev.filter((selectEl) => selectEl !== el)) : setSelect(prev => [...prev, el])}
                  key={el}
                  className={
                    clsx(`h-[15rem] w-[15rem] flex justify-center items-center border-2 border-maincolor-100/0 relative p-1 rounded-lg transition-all`,
                      select.find(selectEl => selectEl === el) && ' !border-maincolor-100',
                      `hover:scale-110`)
                  }
                >
                  <Image src={el} alt='user_galery_images' className='object-contain' width={240} height={240} />
                </div>
              )
              :
              'empty'
            }
          </div>
        </div>
      }
      <ImageComponent images={product.images} />
      <Btn className='bg-maincolor-100' onClick={() => setImagePicker(true)}>
        Add Images
      </Btn>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full'>
        <TextArea placeholder='Name' id='name' required register={register} minLength={10} maxLength={300} />
        <TextArea placeholder='Description' id='description' required register={register} />
        <SelectCategory id='category' register={register} required />
        <Input id={'price'} type={'number'} placeholder='Price' register={register} required valueAsNumber validate={(v) => v >= 100 && v <= 999999} />
        <Input id={'discount'} type={'number'} placeholder='Discount' register={register} required valueAsNumber validate={(v) => v >= 10 && v <= 80 || v === 0} />
        <Btn
          disabled={isDisable}
          type='submit'
          className={clsx('w-full p-1 bg-maincolor-100/50 hover:bg-maincolor-100 rounded-lg relative transition-all', isDisable && 'disabled:pointer-events-none')}
        >
          Submit changes
        </Btn>
        <Btn
          disabled={isDisable}
          className={clsx('w-full p-1 bg-maincolor-100/50 hover:bg-maincolor-100 rounded-lg relative transition-all', isDisable && 'disabled:pointer-events-none')}
          onClick={() => handleHiddeProduct()}
        >
          {product.hide ? 'Show product' : 'Hide product'}
        </Btn>
        <Btn
          disabled={isDisable}
          className={clsx('w-full p-1 bg-maincolor-600/50 hover:bg-maincolor-600 rounded-lg relative transition-all', isDisable && 'disabled:pointer-events-none')}
          onClick={() => handleDeleteProduct()}
        >
          Delete product
        </Btn>
      </form>
    </>
  )
}