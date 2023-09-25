import { orderItemType } from '@/types/types'
import React from 'react'
import noimage from '@/public/noimage.jpg'
import Image from 'next/image'

type OrderItemProps = {
  orderItem: orderItemType
}

export default function OrderItem({
  orderItem
}: OrderItemProps) {

  return (
    <div className='border p-1 flex flex-col gap-2 px-4 items-center min-w-[11rem] max-w-[12rem]'>
      <div className='relative justify-start items-center flex h-[150px] w-[150px]'>
        {
          <Image src={orderItem.product.image.length ? orderItem.product.image[0].path : noimage} alt='product image' width={150} height={150} />
        }
      </div>
      <span className='line-clamp-3'>
        {orderItem.product.name}
      </span>
    </div>
  )
}
