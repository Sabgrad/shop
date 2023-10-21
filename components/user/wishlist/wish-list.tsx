'use client'

import Btn from '@/components/buttons/btn'
import ProductCard from '@/components/cards/productcard/product-card'
import FlexLayout from '@/components/items/flex-layout'
import { useWishListStorage } from '@/context/zustand'
import { useFetchProductInWishList } from '@/hooks/tanstack-query/useQuery-hooks'
import React from 'react'

export default function WishList() {

  const { wishList, clearWishList } = useWishListStorage()

  const { data } = useFetchProductInWishList({ wishList })

  return (
    <>
      <Btn disabled={!wishList || wishList.length === 0} onClick={() => clearWishList()}>
        Clear wish list
      </Btn>
      <FlexLayout>
        {
          data?.map((el) =>
            <ProductCard key={el.id} product={el} />
          )
        }
      </FlexLayout>
    </>

  )
}