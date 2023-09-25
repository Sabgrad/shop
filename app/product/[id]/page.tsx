'use client'

import Btn from '@/components/buttons/btn'
import ImageComponent from '@/components/images/image-component'
import { useCartContext } from '@/context/cart-context'
import { Product } from '@prisma/client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { TfiEmail } from 'react-icons/tfi'

const getProduct = async (id: string) => {
  const result = await axios.get(`/api/product/${id}`)

  if (result.data) {
    return result.data
  }
}

export default function Product() {

  const { id } = useParams()

  const { userCart, setUserCart } = useCartContext()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [inCart, setInCart] = useState(false)

  useEffect(() => {
    if (id) {
      getProduct(id as string).then((res) => setProduct(res))
        .finally(() => setIsLoading(false))
    }
  }, [id])

  useEffect(() => {
    if (product) {
      if (userCart.find((el) => el.productId === product.id)) {
        setInCart(true)
      } else {
        setInCart(false)
      }
    }
  }, [userCart, product])

  const handleCart = () => {
    if (product) {
      if (inCart) {
        console.log('added')
        setUserCart(prev => prev.filter((el) => el.productId !== product.id))
      } else {
        console.log('deleted')
        setUserCart(prev => [...prev, { productId: product.id }])
      }
    }
  }

  if (isLoading) return <>Loading</>

  return (
    <div className='w-full h-full flex jusitfy-center items-center'>
      {
        product ?
          <div className='w-full h-full break-words p-4 flex flex-col gap-2 overflow-y-auto'>
            <div className='flex flex-col lg:flex-row gap-2 items-center lg:items-start'>
              <ImageComponent images={product.images} />
              <div className='flex flex-col gap-2 flex-1 justify-start w-full'>
                <span className='font-semibold lg:text-xl xl:text-2xl'>
                  {product.name}
                </span>
                <div className='flex flex-col sm:flex-row w-full justify-between'>
                  <span>
                    Rating: 5/5
                  </span>
                  <span>
                    Code: {product.id}
                  </span>
                </div>
                <div className='flex flex-col w-full border border-maincolor-100 rounded-lg'>
                  <div className='flex flex-row items-center justify-between px-2 py-4 border-b border-b-maincolor-100'>
                    <span>
                      Customer: {product.ownerId}
                    </span>
                    <Btn className='bg-maincolor-100'>
                      <TfiEmail size={30} />
                    </Btn>
                  </div>
                  <div className='flex flex-col gap-2 px-2 py-4'>
                    {
                      product.discount !== 0 ?
                        <>
                          <span className='line-through text-sm'>
                            {product.price + '\u20B4'}
                          </span>
                          <span className='font-semibold text-2xl text-maincolor-500'>
                            {product.actual_price + '\u20B4'}
                          </span>
                        </>
                        :
                        <span className='font-semibold text-2xl'>
                          {product.actual_price + '\u20B4'}
                        </span>
                    }
                    <Btn className='bg-maincolor-100' onClick={handleCart}>
                      {inCart ? 'Delete product from cart' : 'Added product to cart'}
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
            <span className='w-full'>
              {product.description}
            </span>
          </div>
          :
          <h1>
            {`Product with id: ${id} not found`}
          </h1>
      }
    </div>
  )
}
