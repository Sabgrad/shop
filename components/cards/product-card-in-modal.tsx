import { ProductType } from '@/types/types'
import React from 'react'
import ImageComponent from '../images/image-component'
import { useRouter } from 'next/navigation'

type ProductCardInModalProps = {
  product: ProductType
}

export default function ProductCardInModal({
  product
}: ProductCardInModalProps) {

  const router = useRouter()

  return (
    <div className='flex flex-col sm:flex-row gap-2'>
      <ImageComponent type='view' productId={product.id} images={product.image} />
      <div className='flex flex-col gap-2 min-h-full select-text'>
        <span className='line-clamp-4'>
          {product.name}
        </span>
        <span>
          {product.discount !== 0 ? product.price : product.price / 100 * 60} {' \u20B4'}
        </span>
        <span className='line-clamp-6'>
          {product.description}
        </span>
        <div className='flex flex-row gap-2 mt-auto'>
          <button className='w-1/2 bg-green-500/50 hover:bg-green-500 p-1' onClick={() => null}>
            Add to cart
          </button>
          <button className='w-1/2 bg-green-500/50 hover:bg-green-500 p-1' onClick={() => router.push(`/product/${product.id}`)}>
            Go to product
          </button>
        </div>
      </div>
    </div>
  )
}