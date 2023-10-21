import ProductCardUserCartToggle from '@/components/buttons/product-card-user-cart-toggle'
import ProductCardWishListToggle from '@/components/buttons/product-card-wish-list-toggle'
import { ProductCardType } from '@/types/types'
import React from 'react'

type CartWishListTogglesProps = {
  type: ProductCardType
  active: boolean
  id: string
}

export default function CartWishListToggles({
  type,
  active,
  id
}: CartWishListTogglesProps) {

  if (type === 'user' || !active) return null

  return (
    <>
      <ProductCardUserCartToggle id={id} />
      <ProductCardWishListToggle id={id} />
    </>
  )
}