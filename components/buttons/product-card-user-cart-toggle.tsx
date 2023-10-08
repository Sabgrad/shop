import useInCart from '@/hooks/useInCart'
import clsx from 'clsx'
import React from 'react'
import { BsCartDash, BsCartPlus } from 'react-icons/bs'

export default function ProductCardUserCartToggle({
  id
}: { id: string }) {

  const { inCart, handleCart } = useInCart(id)

  return (
    <div
      className={clsx(`absolute right-2 top-2 p-2 rounded-full transition-all hover:scale-125 opacity-0 group-hover:opacity-100 
    bg-maincolor-50 border border-black`)}
      onClick={handleCart}
    >
      {
        inCart
          ?
          <BsCartDash className='text-maincolor-500' size={25} />
          :
          <BsCartPlus size={25} />
      }
    </div>
  )
}
