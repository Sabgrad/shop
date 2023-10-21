import { ProductCardType } from '@/types/types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import noimage from '@/public/noimage.jpg'

type ProductImageItemProps = {
  type: ProductCardType
  images: string[]
  id: string
}

export default function ProductImageItem({
  type,
  images,
  id
}: ProductImageItemProps) {
  return (
    <Link href={type === 'default' ? `/product/${id}` : '#'} className='relative justify-center items-center flex flex-1 min-h-[250px] hover:cursor-pointer'>
      {
        <Image className='rounded' src={images.length ? images[0] : noimage} alt='product image' width={250} height={200} />
      }
    </Link>
  )
}