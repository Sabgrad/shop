'use client'

import React, { useRef, useState } from 'react'
import { Product } from '@prisma/client'
import clsx from 'clsx'
import CartWishListToggles from './cart-wish-list-toggles'
import BottomLeftInfo from './bottom-left-info'
import { ProductCardType } from '@/types/types'
import ProductUpdateModal from './product-update-modal'
import ProductPriceItem from './product-price-item'
import ProductImageItem from './product-image-item'
import ProductNameItem from './product-name-item'
import { useIsHover } from '@/hooks/usIsHover'

type ProductCardProps = {
  product: Product | Omit<Product, 'orderIds'>
  onClick?: () => void
  amount?: number
  type?: ProductCardType
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

  const ref = useRef<HTMLDivElement | null>(null)
  const isHover = useIsHover(ref)

  const handleClick = () => { onClick && onClick(), type === 'user' && setActiveModal(true) }

  return (
    <>
      <div
        className={clsx('gap-2 flex flex-col p-2 border relative rounded max-w-[250px] group',
          'dark:border-maincolor-50/30 border-maincolor-950/30 dark:bg-black hover:bg-maincolor-950/10 bg-white dark:hover:bg-maincolor-50/30'
        )}
        onClick={handleClick}
        ref={ref}
      >
        <ProductImageItem id={product.id} images={product.images} type={type} />
        <ProductNameItem id={product.id} name={product.name} type={type} />
        <ProductPriceItem price={product.price} actual_price={product.actual_price} discount={product.discount} />
        <BottomLeftInfo type={type} discount={product.discount} amount={amount} />
        <CartWishListToggles id={product.id} active={isHover} type={type} />
      </div >
      <ProductUpdateModal imagesData={imagesData} product={product as Product} activeModal={activeModal} setActiveModal={setActiveModal} type={type} />
    </>
  )
}