import UserCartItem from '@/components/items/user-cart-item'
import { useCartContext } from '@/context/cart-context'
import React from 'react'

export default function MyCart() {

  const { userCart } = useCartContext()

  return (
    <>
      <div>
        dadada
      </div>
      {
        userCart.map((product) =>
          <UserCartItem key={product.id} product={product} />
        )
      }
    </>
  )
}