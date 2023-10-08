'use client'

import ProductCard from '@/components/cards/product-card'
import ProductCreateForm from '@/components/forms/product-create-form'
import MyShopImageBoard from '@/components/images/my-shop-image-board'
import { useUserContext } from '@/context/user-context'
import React, { useState } from 'react'
import { useFetchUserShopImages, useFetchUserShopProducts } from '@/hooks/tanstack-query/useQuery-hooks'

export default function MyShop() {
  const { user, triggerProduct } = useUserContext()
  const [triggerImages, setTriggerImages] = useState(0)

  const { data: products } = useFetchUserShopProducts({ user, triggerProduct })
  const { data: images } = useFetchUserShopImages({ user, triggerImages })

  if (!user) return null

  return (
    <>
      <MyShopImageBoard id={user.id} images={images} setTriggerImages={setTriggerImages} />
      <ProductCreateForm />
      <div className='w-full border-b border-black/40' />
      <div className='flex flex-wrap justify-evenly'>
        {products?.map((el) =>
          <ProductCard type='user' imagesData={images} key={el.id} product={el} />
        )}
      </div>
    </>
  )
}