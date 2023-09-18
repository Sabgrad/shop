import { ProductType } from '@/types/types'
import React, { useEffect, useState } from 'react'
import ImageComponent from '../images/image-component'
import { useRouter } from 'next/navigation'
import { useCartContext } from '@/context/cart-context'

type ProductCardInModalProps = {
  product: ProductType
}

export default function ProductCardInModal({
  product
}: ProductCardInModalProps) {

  const router = useRouter()

  const { userCart, setUserCart } = useCartContext()

  const [inCart, setInCart] = useState<boolean>(false)

  useEffect(() => {
    setInCart(() => {
      if (userCart.find((el) => el.id === product.id)) {
        return true
      }
      else return false
    })
  }, [userCart])

  const handleClickCartAction = () => {
    if (inCart) {
      setUserCart(prev => prev.filter((el) => el.id !== product.id))
    } else {
      setUserCart(prev => [...prev, { ...product, amount: 1 }])
    }
  }

  return (
    <div className='flex flex-col sm:flex-row gap-2'>
      <ImageComponent type='view' productId={product.id} images={product.image} />
      <div className='flex flex-col gap-2 min-h-full select-text min-w-[15rem] max-w-2xl'>
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
          <button className='w-1/2 bg-green-500/50 hover:bg-green-500 p-1' onClick={handleClickCartAction}>
            {inCart ? 'Delete' : 'Add to cart'}
          </button>
          <button className='w-1/2 bg-green-500/50 hover:bg-green-500 p-1' onClick={() => router.push(`/product/${product.id}`)}>
            Go to product
          </button>
        </div>
      </div>
    </div>
  )
}