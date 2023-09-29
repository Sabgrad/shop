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
      .then((res) => setCart(res.map((product) => ({ ...product.data, quantity: 1 }))))
      .finally(() => setIsLoading(false))
  }, [userCart])

  const handleCreateOrder = () => {
    if (user) {
      setIsDisable(true)
      let price = cart.reduce((acc, current) => acc + (current.actual_price * current.quantity), 0)
      let products = cart.map((el) => ({ id: el.id }))
      let options = new Object
      cart.forEach((el) => (Object.assign(options, { [el.id]: el.quantity })))
      axios.post('/api/order', {
        email: user.email,
        status: 'Processed',
        price,
        products: products,
        options: options,
      })
        .then(() => setUserCart([]))
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