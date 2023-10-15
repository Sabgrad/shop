import Btn from '@/components/buttons/btn'
import ProductCard from '@/components/cards/product-card'
import { userCartType } from '@/types/types'
import React, { useState } from 'react'
import { BiMinus } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'
import { useFetchProductInCart, useFetchUser } from '@/hooks/tanstack-query/useQuery-hooks'
import { useCreateOrder } from '@/hooks/tanstack-query/useMutation-hooks'
import FlexLayout from '@/components/items/flex-layout'
import { useUserCartStorage } from '@/context/zustand'

export default function MyCart() {

  const { userCart } = useUserCartStorage()
  const { data: user } = useFetchUser()
  const [cart, setCart] = useState<userCartType[]>([])

  const { isFetching } = useFetchProductInCart({ userCart, setCart })

  const { mutate: createOrder, isLoading } = useCreateOrder({ setCart })

  const handleCreateOrder = () => {
    if (user) {
      let price = cart.reduce((acc, current) => acc + (current.actual_price * current.quantity), 0)
      let products = cart.map((el) => ({ id: el.id }))
      let options = new Object
      cart.forEach((el) => (Object.assign(options, { [el.id]: el.quantity })))
      createOrder({ email: user.email, price, products, options })
    }
  }

  if (isFetching) return <>Laoding ...</>

  return (
    <>
      {
        cart.length > 0 ?
          <>
            <FlexLayout>
              {
                cart.map((product, index) =>
                  <div className='flex flex-col gap-2' key={product.id}>
                    <ProductCard product={product} />
                    <div className='flex flex-row gap-2'>
                      <div className='flex h-8 w-8 rounded-full justify-center items-center bg-maincolor-500 text-white'>
                        {product.quantity}
                      </div>
                      <Btn
                        className='bg-maincolor-100 w-8 h-8 !rounded-full'
                        disabled={product.quantity < 9 ? false : true}
                        onClick={() => setCart(prev => [...prev.slice(0, index), { ...prev[index], quantity: prev[index].quantity + 1 }, ...prev.slice(index + 1)])}>
                        <BsPlus size={25} />
                      </Btn>
                      <Btn
                        className='bg-maincolor-100 w-8 h-8 !rounded-full'
                        disabled={product.quantity > 1 ? false : true}
                        onClick={() => setCart(prev => [...prev.slice(0, index), { ...prev[index], quantity: prev[index].quantity - 1 }, ...prev.slice(index + 1)])}>
                        <BiMinus size={25} />
                      </Btn>
                    </div>
                  </div>
                )
              }
            </FlexLayout>
            <Btn disabled={isLoading} onClick={handleCreateOrder} >
              Create order
            </Btn>
          </>
          :
          'Your cart is empty'
      }
    </>
  )
}