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
    <div className='border p-1 flex flex-row gap-2 px-4 items-center'>
      <div className='relative justify-start items-center flex h-[150px] w-[150px]'>
        {
          <Image src={orderItem.product.image.length ? orderItem.product.image[0].path : noimage} alt='product image' width={150} height={150} />
        }
      </div>
      <span className='flex flex-1'>
        {orderItem.product.name}
      </span>
      <table className='h-full'>
        <tr>
          <td className='px-2 text-center'>
            Price per unit
          </td>
          <td className='px-2 text-center'>
            Amount
          </td>
          <td className='px-2 text-center'>
            Total price
          </td>
        </tr>
        <tr>
          <td className='px-2 text-center'>
            {orderItem.product.actual_price}
          </td>
          <td className='mr-2 text-center'>
            {orderItem.amount}
          </td>
          <td className='px-2 text-center'>
            {orderItem.amount * orderItem.product.actual_price}
          </td>
        </tr>
      </table>
    </div>
  )
}
