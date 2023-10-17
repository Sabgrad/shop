'use client'

import React, { useRef, useState } from 'react'
import noimage from '@/public/noimage.jpg'
import Image from 'next/image'
import Modal from '../modals/modal'
import ProductUpdaterForm from '../forms/product-update-form'
import { Product } from '@prisma/client'
import ProductCardUserCartToggle from '../buttons/product-card-user-cart-toggle'
import ProductCardWishListToggle from '../buttons/product-card-wish-list-toggle'
import clsx from 'clsx'

type ProductCardProps = {
  product: Product | Omit<Product, 'orderIds'>
  onClick?: () => void
  amount?: number
  type?: 'user' | 'order' | 'default'
  imagesData?: string[]
}

export default function ProductCard({
  onClick,
  product,
  type = 'default',
  amount,
  imagesData
}: ProductCardProps) {

  const [activeModal, setActiveModal] = useState(false)
  const [isHover, setIsHover] = useState(false)

  const handleClick = () => {
    onClick && onClick()
    type === 'user' && setActiveModal(true)
  }

  const handleOpenProductPage = () => {
    if (type === 'default') window.open(`/product/${product.id}`, '_blanck', 'noopener noreferrer')
  }

  return (
    <>
      <div
        className={clsx('gap-2 flex flex-col p-2 border relative rounded max-w-[250px] group',
          'dark:border-maincolor-50/30 border-maincolor-950/30 dark:bg-black hover:bg-maincolor-950/10 bg-white dark:hover:bg-maincolor-50/30'
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className='relative justify-center items-center flex flex-1 min-h-[250px] hover:cursor-pointer' onClick={handleOpenProductPage}>
          {
            <Image className='rounded' src={product.images.length ? product.images[0] : noimage} alt='product image' width={250} height={200} />
          }
        </div>
        <span className='line-clamp-2 h-[48px] break-words hover:underline hover:cursor-pointer' onClick={handleOpenProductPage}>
          {product.name}
        </span>
        <div className='flex flex-col w-full gap-1 h-[44px] justify-end'>
          {
            product.discount === 0 ?
              <span>{product.price} {' \u20B4'}</span>
              :
              <>
                <span className='text-xs line-through'>{product.price + ' \u20B4'}</span>
                <span className='text-maincolor-500'>{product.actual_price + ' \u20B4'}</span>
              </>
          }
        </div>
        {type === 'order' ?
          <div className='absolute bg-maincolor-600 w-10 h-10 flex justify-center items-center rounded-full bottom-2 right-2 text-white'>
            {'x' + amount}
          </div> :
          product.discount !== 0 ?
            <div className='absolute bg-maincolor-600 w-10 h-10 flex justify-center items-center rounded-full bottom-2 right-2 text-white'>
              {product.discount + '%'}
            </div>
            :
            null
        }
        {
          type !== 'user' && isHover &&
          <>
            <ProductCardUserCartToggle id={product.id} />
            <ProductCardWishListToggle id={product.id} />
          </>
        }
      </div>
      {
        type === 'user' && imagesData !== undefined &&
        < Modal active={activeModal} setActive={setActiveModal}>
          <ProductUpdaterForm imagesData={imagesData} product={product as Product} />
        </Modal >
      }
    </>
  )
}