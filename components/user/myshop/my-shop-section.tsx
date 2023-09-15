'use client'

import ProductCard from '@/components/cards/product-card'
import ProductCreateForm from '@/components/forms/product-create-form'
import { useUserContext } from '@/context/user-context'
import { ProductType } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const getUserProduct = async (id: string) => {
  const res = await axios.get(`/api/user/product`, {
    params: {
      userId: id
    }
  })

  if (res.data) {
    return res.data
  }
}

export default function MyShop() {

  const { user, triggerProduct, setIsLoading } = useUserContext()

  const [product, setProduct] = useState<ProductType[]>()

  useEffect(() => {
    if (user && triggerProduct > 0) {
      setIsLoading(true)
      getUserProduct(user.id)
        .then((res) => setProduct(res))
        .finally(() => setIsLoading(false))
    }
  }, [user, triggerProduct])

  return (
    <>
      <ProductCreateForm />
      <div className='w-full border-b border-black/40' />
      <div className='gap-2 grid p-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:responsive-grid'>
        {product?.map((el) =>
          <ProductCard type='user' key={el.id} product={el} />
        )}
      </div>
    </>
  )
}