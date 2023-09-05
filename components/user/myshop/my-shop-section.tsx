'use client'

import ProductCard from '@/components/cards/product-card'
import ProductCreateForm from '@/components/forms/product-create-form'
import { useUserContext } from '@/context/user-context'
import React from 'react'

export default function MyShop() {

  const { product } = useUserContext()

  return (
    <>
      <ProductCreateForm />
      <div className='w-full border-b border-black/40' />
      <div className='gap-2 grid p-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:responsive-grid'>
        {product?.map((el, index) =>
          <ProductCard type='user' key={el.id} product={el} />
        )}
      </div>
    </>
  )
}