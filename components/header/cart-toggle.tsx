'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCartContext } from '@/context/cart-context'

export default function CartToggle() {

  const { userCart } = useCartContext()
  
  return (
    <Btn className='relative text-maincolor-100'>
      <AiOutlineShoppingCart size={28} />
      <div className='absolute text-white font-semibold text-sm -top-2 right-0'>
        {userCart.length}
      </div>
    </Btn>
  )
}
