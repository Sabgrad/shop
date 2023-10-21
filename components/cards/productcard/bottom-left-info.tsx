import { ProductCardType } from '@/types/types'
import React from 'react'


type BottomLeftInfoProps = {
  type: ProductCardType
  discount: number
  amount: number | undefined
}

export default function BottomLeftInfo({
  discount,
  type,
  amount
}: BottomLeftInfoProps) {
  return (
    <>
      {type === 'order' ?
        <div className='absolute bg-maincolor-600 w-10 h-10 flex justify-center items-center rounded-full bottom-2 right-2 text-white'>
          {'x' + amount}
        </div> :
        discount !== 0 ?
          <div className='absolute bg-maincolor-600 w-10 h-10 flex justify-center items-center rounded-full bottom-2 right-2 text-white'>
            {discount + '%'}
          </div>
          :
          null
      }
    </>
  )
}