import { ProductCardType } from '@/types/types'
import Link from 'next/link'
import React from 'react'

type ProductNameItemProps = {
  id: string
  name: string
  type: ProductCardType
}

export default function ProductNameItem({
  name,
  id,
  type
}: ProductNameItemProps) {
  return (
    <Link
      href={type === 'default' ? `/product/${id}` : '#'}
      className='line-clamp-2 h-[48px] break-words hover:underline hover:cursor-pointer'
    >
      {name}
    </Link>
  )
}
