'use client'

import { ProductType } from '@/types/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const getProduct = async (id: string) => {
  const result = await axios.get(`/api/product/${id}`)

  if (result.data) {
    return result.data
  }
}

export default function Product() {

  const { id } = useParams()

  const [product, setProduct] = useState<ProductType | undefined>(undefined)

  useEffect(() => {
    if (id) {
      getProduct(id as string).then((res) => setProduct(res))
    }
  }, [id])

  return (
    <>
      {
        product ?
          product.id
          :
          'wrong id'
      }
    </>
  )
}
