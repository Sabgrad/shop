'use client'

import { Product } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import png from '@/public/png.png'
import noimage from '@/public/noimage.jpg'
import { CldUploadButton } from 'next-cloudinary'
import axios from 'axios'

type ProductCardProps = {
  product: Product
  onClick?: () => void
}

export default function ProductCard({
  onClick,
  product
}: ProductCardProps) {

  const handleClick = () => {
    onClick && onClick()
  }

  useEffect(() => {
    console.log(product)
  }, [product])

  return (
    <div className='gap-4 flex flex-col p-2 border max-w-[20rem] border-black' onClick={handleClick}>
      <div className='relative h-full w-full'>
        <CldUploadButton onUpload={(result) => {
          axios.post('/api/image', {
            path: result.info.secure_url,
            productId: product.id
          })
        }} options={{ maxFiles: 1 }} uploadPreset='niudip3t'>
          {
            'image' in product && product.image.length ?
              product.image.map((image) =>
                <Image src={image.path} alt='product image' layout='fill' />
              )
              :
              <Image src={noimage} alt='product image' sizes='100%' />
          }
        </CldUploadButton>
      </div>
      <span className='line-clamp-2'>
        {product.name}
      </span>
      <div className='flex flex-col w-full gap-1 h-[44px] justify-end'>
        {
          product.discount === 0 ?
            <span>{product.price} {'grn'}</span>
            :
            <>
              <span className='text-xs'>{product.price + ' grn'}</span>
              <span>{product.price - (product.price / 100 * product.discount) + ' grn'}</span>
            </>
        }
      </div>
    </div>
  )
}