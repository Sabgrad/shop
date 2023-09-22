'use client'

import React, { useState } from 'react'
import noimage from '@/public/noimage.jpg'
import { ProductType } from '@/types/types'
import Image from 'next/image'
import Modal from '../modals/modal'
import ProductUpdaterForm from '../forms/product-update-form'
import ProductCardInModal from './product-card-in-modal'

type ProductCardProps = {
  product: ProductType
  onClick?: () => void
  type?: 'default' | 'user'
}

export default function ProductCard({
  onClick,
  product,
  type = 'default'
}: ProductCardProps) {

  const [activeModal, setActiveModal] = useState(false)

  const handleClick = () => {
    onClick && onClick()
    setActiveModal(true)
  }

  return (
    <>
      <div className='gap-2 flex flex-col p-2 border  rounded-lg max-w-[250px] bg-maincolor-100/50 hover:bg-maincolor-100' onClick={handleClick}>
        <div className='relative justify-center items-center flex flex-1 h-[250px] '>
          {
            <Image className='rounded-lg' src={product.image.length ? product.image[0].path : noimage} alt='product image' width={250} height={250} />
          }
        </div>
        <span className='line-clamp-2 h-[48px]'>
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
      </div>
      {
        type === 'user' ?
          < Modal active={activeModal} setActive={setActiveModal}>
            <ProductUpdaterForm product={product} />
          </Modal >
          :
          type === 'default' ?
            < Modal active={activeModal} setActive={setActiveModal}>
              <ProductCardInModal product={product} />
            </Modal >
            : null
      }
    </>
  )
}