import { useWishListContext } from '@/context/wish-list-context'
import { useEffect, useState } from 'react'

export default function useInWishList(id: string | undefined): { inWishList: boolean, handleWishList: () => void } {

  const [inWishList, setInWishList] = useState(false)

  const { userWishList, setUserWishList } = useWishListContext()

  const handleWishList = () => {
    if (id) {
      if (inWishList) {
        setUserWishList(prev => prev.filter((el) => el.productId !== id))
      } else {
        setUserWishList(prev => [...prev, { productId: id }])
      }
    }
  }

  useEffect(() => {
    if (id) {
      if (userWishList.find((el) => el.productId === id)) {
        setInWishList(true)
      } else {
        setInWishList(false)
      }
    }
  }, [id, userWishList])

  return { inWishList, handleWishList }
}