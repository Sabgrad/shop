'use client'

import React from 'react'
import Btn from '../buttons/btn'
import useInCart from '@/hooks/useInCart'
import { useIsMount } from '@/hooks/usIsMount'


type ProductCartHadnlerProps = {
  id: string | undefined
}

export default function ProductCartHadnler({
  id
}: ProductCartHadnlerProps) {

  const { inCart, handleCart } = useInCart(id)
  const { isMount } = useIsMount()

  return (
    <Btn disabled={!isMount} onClick={handleCart} >
      {
        inCart ? 'Delete product from cart' : 'Added product to cart'
      }
    </Btn >
  )
}