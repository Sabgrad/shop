'use client'

import ProductCard from '@/components/cards/product-card'
import ProductCreateForm from '@/components/forms/product-create-form'
import MyShopImageBoard from '@/components/images/my-shop-image-board'
import { useUserContext } from '@/context/user-context'
import { Product } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const getUserProduct = async (id: string) => {
  const res = await axios.get(`/api/user/product`, {
    params: {
      user_id: id
    }
  })

  if (res.data) {
    return res.data
  }
}

const getImages = async (id: string) => {
  console.log('request')
  const res = await axios.get(`/api/user/images`, {
    params: {
      user_id: id
    }
  })

  if (res.data) {
    return res.data.images
  }
}

export default function MyShop() {
  const { user, triggerProduct, setIsLoading } = useUserContext()
  const [triggerImages, setTriggerImages] = useState(0)
  const [product, setProduct] = useState<Product[]>([])
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (triggerProduct > 0 && user) {
      setIsLoading(true)
      getUserProduct(user.id)
        .then((res) => { setProduct(res) })
    }
  }, [user, triggerProduct])

  useEffect(() => {
    if (user) {
      getImages(user.id)
        .then((res) => { setImages(res) })
    }
  }, [triggerImages])

  if (!user) return null

  return (
    <>
      <MyShopImageBoard id={user.id} images={images} setTriggerImages={setTriggerImages} />
      <ProductCreateForm />
      <div className='w-full border-b border-black/40' />
      <div className='flex flex-wrap justify-evenly'>
        {product.map((el) =>
          <ProductCard type='user' imagesData={images} key={el.id} product={el} />
        )}
      </div>
    </>
  )
}