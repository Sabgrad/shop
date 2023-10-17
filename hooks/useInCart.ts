import { useUserCartStorage } from '@/context/zustand'
import { useEffect, useState } from 'react'

export default function useInCart(id: string | undefined): { inCart: boolean, handleCart: () => void } {

  const [inCart, setInCart] = useState(false)

  const { userCart, addItem, deleteItem } = useUserCartStorage()

  const handleCart = () => {
    if (id) {
      if (inCart) {
        deleteItem(id)
      } else {
        addItem(id)
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