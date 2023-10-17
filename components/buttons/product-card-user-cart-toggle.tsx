import useInCart from '@/hooks/useInCart'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { BsCartDash, BsCartPlus } from 'react-icons/bs'

export default function ProductCardUserCartToggle({
  id
}: { id: string }) {

  const { inCart, handleCart } = useInCart(id)

  return (
    <div
      className={clsx(`absolute right-2 top-2 p-2 rounded-full transition-all border`,
        'border-maincolor-950/30 dark:border-maincolor-50/30 dark:bg-black bg-gray-50'
      )}
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
