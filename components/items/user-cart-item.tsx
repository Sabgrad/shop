import { } from '@/types/types'
import React from 'react'
import Image from 'next/image'
import noimage from '@/public/noimage.jpg'
import { Product } from '@prisma/client'

type UserCartItemProps = {
  product: Product
}

export default function UserCartItem({
  product
}: UserCartItemProps) {

  return (
    <div className='p-2 border border-gray-500 flex flex-row gap-2'>
      <Image src={product.images[0] || noimage} alt='image' width={150} height={150} />
      {product.name}
    </div>
  )
}