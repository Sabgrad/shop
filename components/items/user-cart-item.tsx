import { ProductType } from '@/types/types'
import React from 'react'
import Image from 'next/image'
import noimage from '@/public/noimage.jpg'

type UserCartItemProps = {
  product: ProductType
}

export default function UserCartItem({
  product
}: UserCartItemProps) {

  return (
    <div className='p-2 border border-gray-500 flex flex-row gap-2'>
      <Image src={product.image[0]?.path || noimage} alt='image' width={150} height={150} />
      {product.name}
    </div>
  )
}