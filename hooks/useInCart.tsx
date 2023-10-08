import { useCartContext } from '@/context/cart-context'
import { useEffect, useState } from 'react'

export default function useInCart(id: string | undefined): { inCart: boolean, handleCart: () => void } {

  const [inCart, setInCart] = useState(false)

  const { userCart, setUserCart } = useCartContext()

  const handleCart = () => {
    if (id) {
      if (inCart) {
        setUserCart(prev => prev.filter((el) => el.productId !== id))
      } else {
        setUserCart(prev => [...prev, { productId: id }])
      }
    }
  }

  useEffect(() => {
    if (id) {
      if (userCart.find((el) => el.productId === id)) {
        setInCart(true)
      } else {
        setInCart(false)
      }
    }
  }, [id, userCart])

  return { inCart, handleCart }
}