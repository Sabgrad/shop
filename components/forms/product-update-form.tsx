'use client'

import { ProductType } from '@/types/types'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import noimage from '@/public/noimage.jpg'
import axios from 'axios'
import { useUserContext } from '@/context/user-context'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { category } from '@/lib/data'
import crypto from 'crypto'
import clsx from 'clsx'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { TiFolderDelete, TiFolderAdd } from 'react-icons/ti'

type ProductUpdaterFormProps = {
  product: ProductType
}

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const deleteCloudinrayImage = async (public_id: string) => {
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
  const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
  const timestamp = new Date().getTime()
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`
  const signature = generateSHA1(generateSignature(public_id, api_secret))

  const res = await axios.post(url, {
    public_id,
    signature,
    api_key,
    timestamp,
  })

  console.log(res)
}

export default function ProductUpdaterForm({
  product
}: ProductUpdaterFormProps) {

  const { triggerProductRequest } = useUserContext()

  const [isDisable, setIsDisable] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

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
    const { id: productId } = product
    const { secure_url: path, public_id: publicId } = result.info
    setIsDisable(true)
    axios.post('/api/image', {
      path,
      productId,
      publicId
    })
      .then(() => triggerProductRequest())
      .finally(() => setIsDisable(false))
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsDisable(true)
    const { name, description, price, category, discount } = data
    axios.patch(`/api/product/${product.id}`, {
      name, description, price, category, discount
    })
      .then(() => triggerProductRequest())
      .finally(() => setIsDisable(false))
  }

  const handleDeleteImage = (id: string, publicId: string) => {
    setIsDisable(true)
    axios.delete(`/api/image/${id}`)
      .then(() => {
        deleteCloudinrayImage(publicId)
          .then(() => { setCurrentImage(0), triggerProductRequest() })
      })
      .finally(() => setIsDisable(false))
  }

  const isDisableFunc = () => {
    if (product.image.length >= 5 || isDisable) {
      return true
    }
  }

  const handleSwapImage = (type: 'left' | 'right') => {
    if (type === 'left') {
      if (currentImage === 0) {
        setCurrentImage(product.image.length - 1)
      }
      if (currentImage !== 0) {
        setCurrentImage(prev => prev - 1)
      }
    }
    if (type === 'right') {
      if (currentImage === product.image.length - 1) {
        setCurrentImage(0)
      }
      if (currentImage < product.image.length - 1) {
        setCurrentImage(prev => prev + 1)
      }
    }
  }

  useEffect(() => {
    console.log(currentImage)
  }, [currentImage])

  return (
    <>
      <div className='flex gap-2'>
        <div className='gap-2 flex flex-col'>
          {product.image.map((el) =>
            <div
              key={el.id}
              className='flex w-20 h-20 justify-start items-center relative 
            bg-gray-200 rounded-lg group'
            >
              <TiFolderDelete
                className='hover:text-black text-black/40 absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-200/60 rounded-lg transition-all'
                size={40}
                onClick={() => handleDeleteImage(el.id, el.publicId)}
              />
              <Image
                src={el.path}
                alt='image'
                width={80}
                height={80}
              />
            </div>
          )}
        </div>
        <div className={clsx('h-[432px] justify-center items-center relative flex bg-gray-200 rounded-lg group', isDisableFunc() && 'pointer-events-none')}>
          {
            product.image.length !== 0 &&
            <AiOutlineLeft
              className='opacity-0 group-hover:opacity-100 absolute left-1 bg-gray-100/10 hover:bg-gray-100/60 pointer-events-auto rounded-lg transition-all'
              size={40}
              onClick={() => handleSwapImage('left')}
            />
          }
          {
            product.image !== null && product.image.length ?
              <Image
                src={product.image.at(currentImage)?.path as string}
                alt='product image'
                width={432}
                height={432}
              />
              :
              <Image
                src={noimage}
                alt='product image'
                width={234}
                height={234}
              />
          }
          <CldUploadButton
            onUpload={handleUpload}
            options={{ maxFiles: 1 }}
            uploadPreset='niudip3t'
            className='absolute'
          >
            <TiFolderAdd
              size={100}
              className='opacity-0 group-hover:opacity-100 bg-gray-100/10 hover:bg-gray-100/60 pointer-events-auto rounded-lg transition-all'
            />
          </CldUploadButton>
          {
            product.image.length !== 0 &&
            <AiOutlineRight
              className='opacity-0 group-hover:opacity-100 absolute right-1 bg-gray-100/10 hover:bg-gray-100/60 pointer-events-auto rounded-lg transition-all'
              size={40}
              onClick={() => handleSwapImage('right')}
            />
          }
        </div>
      </div>
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
        <button type='submit' className='w-full p-1 bg-green-500/50 hover:bg-green-500 rounded-lg transition-all'>
          Submit changes
        </button>
        <button type='button' className='w-full p-1 bg-red-500/50 hover:bg-red-500 rounded-lg relative transition-all'>
          Delete product
        </button>
      </form>
    </>
  )
}