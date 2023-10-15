import { useWishListStorage } from '@/context/zustand'
import { useEffect, useState } from 'react'

export default function useInWishList(id: string | undefined): { inWishList: boolean, handleWishList: () => void } {

  const [inWishList, setInWishList] = useState(false)

  const { wishList, addItem, deleteItem } = useWishListStorage()

  const handleWishList = () => {
    if (id) {
      if (inWishList) {
        deleteItem(id)
      } else {
        addItem(id)
      }
    }
  }

  useEffect(() => {
    if (id) {
      if (wishList.find((el) => el.productId === id)) {
        setInWishList(true)
      } else {
        setInWishList(false)
      }
    }
  }, [id, wishList])

  return { inWishList, handleWishList }
}