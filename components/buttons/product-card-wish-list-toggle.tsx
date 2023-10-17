import useInWishList from '@/hooks/useInWishList'
import clsx from 'clsx'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export default function ProductCardWishListToggle({
  id
}: { id: string }) {

  const { inWishList, handleWishList } = useInWishList(id)

  return (
    <div
      className={clsx(`absolute left-2 top-2 p-2 rounded-full transition-all border flex justify-center items-center`,
        'border-maincolor-950/30 dark:border-maincolor-50/30 dark:bg-black bg-gray-50'
      )}

      onClick={handleWishList}
    >
      {
        inWishList
          ?
          <AiFillHeart className='text-maincolor-500' size={25} />
          :
          <AiOutlineHeart size={25} />
      }
    </div>
  )
}
