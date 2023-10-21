'use client'

import ProductCard from '@/components/cards/productcard/product-card'
import ProductCreateForm from '@/components/forms/product-create-form'
import MyShopImageBoard from '@/components/images/my-shop-image-board'
import React from 'react'
import { useFetchUser, useFetchUserShopImages, useFetchUserShopProducts } from '@/hooks/tanstack-query/useQuery-hooks'
import FlexLayout from '@/components/items/flex-layout'

export default function MyShop() {
  const { data: user } = useFetchUser()

  const { data: products } = useFetchUserShopProducts({ user })
  const { data: images } = useFetchUserShopImages({ user })

  if (!user) return null

  return (
    <>
      <MyShopImageBoard id={user.id} images={images} />
      <ProductCreateForm />
      <div className='w-full border-b border-black/40' />
      <FlexLayout>
        {products?.map((el) =>
          <ProductCard type='user' imagesData={images} key={el.id} product={el} />
        )}
      </FlexLayout>
    </>
  )
}