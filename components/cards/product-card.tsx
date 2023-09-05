'use client'

import React, {  useState } from 'react'
import noimage from '@/public/noimage.jpg'
import { ProductType } from '@/types/types'
import Image from 'next/image'
import Modal from '../modals/modal'
import ProductUpdaterForm from '../forms/product-update-form'

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
    type === 'user' && setActiveModal(true)
  }

  return (
    <>
      <div className='gap-2 flex flex-col p-2 border border-gray-300 rounded-xl max-w-[250px] bg-white' onClick={handleClick}>
        <div className='relative flex flex-1 h-[234px]'>
          {
            product.image !== null && product.image.length ?
              <Image src={product.image.at(0)?.path as string} alt='product image' width={234} height={234} />
              :
              <Image src={noimage} alt='product image' width={234} height={234} />
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
                <span className='text-red-500'>{Math.round(product.price - (product.price / 100 * product.discount)) + ' \u20B4'}</span>
              </>
          }
        </div>
      </div>
      <Modal active={activeModal} setActive={setActiveModal}>
         <ProductUpdaterForm product={product}/>
      </Modal>
    </>
  )
}