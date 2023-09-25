import Btn from '@/components/buttons/btn'
import ProductCard from '@/components/cards/product-card'
import { useCartContext } from '@/context/cart-context'
import { useUserContext } from '@/context/user-context'
import { userCartType } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiMinus } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'



export default function MyCart() {

  const [isLoading, setIsLoading] = useState(true)
  const { userCart, setUserCart } = useCartContext()
  const { user } = useUserContext()
  const [isDisable, setIsDisable] = useState(false)
  const [cart, setCart] = useState<userCartType[]>([])

  useEffect(() => {
    const promise = userCart.map((el) => axios.get(`api/product/${el.productId}`))

    Promise
      .all(promise)
      .then((res) => setCart(res.map((product) => ({ ...product.data, amount: 1 }))))
      .finally(() => setIsLoading(false))
  }, [userCart])

  const handleCreateOrder = () => {
    if (user) {
      setIsDisable(true)
      const price = cart.reduce((acc, current) => acc + (current.actual_price * current.amount), 0)
      axios.post('/api/order', {
        id: user.id,
        status: 'Processed',
        price,
      })
        .then((res) => {
          const data = res.data
          console.log(userCart)
          const promise = cart.map((el) => axios.post('/api/order/item', {
            orderId: data.id,
            productId: el.id,
            amount: el.amount
          }))

          Promise.all(promise)
            .then(() => {
              toast.success('Orders created, go to "My orders" and pay for product')
              setUserCart([])
            })
            .catch(() => {
              toast.error('Something went wrong')
              axios.delete(`/api/order/${res.data.id}`)
            })
        })
        .finally(() => setIsDisable(false))
    }
  }

  if (isLoading) return <>Laoding ...</>

  return (
    <>
      {
        cart.length > 0 ?
          <>
            <div className='flex flex-row flex-wrap gap-2 justify-evenly'>
              {
                cart.map((product, index) =>
                  <div className='flex flex-col gap-2' key={product.id}>
                    <ProductCard product={product} />
                    <div className='flex flex-row gap-2'>
                      <div className='flex h-8 w-8 rounded-full justify-center items-center bg-maincolor-500 text-white'>
                        {product.amount}
                      </div>
                      <Btn
                        className='bg-maincolor-100 w-8 h-8 !rounded-full'
                        disabled={product.amount < 9 ? false : true}
                        onClick={() => setCart(prev => [...prev.slice(0, index), { ...prev[index], amount: prev[index].amount + 1 }, ...prev.slice(index + 1)])}>
                        <BsPlus size={25} />
                      </Btn>
                      <Btn
                        className='bg-maincolor-100 w-8 h-8 !rounded-full'
                        disabled={product.amount > 1 ? false : true}
                        onClick={() => setCart(prev => [...prev.slice(0, index), { ...prev[index], amount: prev[index].amount - 1 }, ...prev.slice(index + 1)])}>
                        <BiMinus size={25} />
                      </Btn>
                    </div>
                  </div>
                )
              }
            </div>
            <Btn disabled={isDisable} onClick={handleCreateOrder} className='bg-maincolor-100'>
              Create order
            </Btn>
          </>
          :
          'Your cart is empty'
      }
    </>
  )
}