import ProductCard from '@/components/cards/product-card'
import { useCartContext } from '@/context/cart-context'
import { useUserContext } from '@/context/user-context'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



export default function MyCart() {

  const { userCart, setUserCart } = useCartContext()
  const { user } = useUserContext()
  const [isDisable, setIsDisable] = useState(false)

  const handleCreateOrder = () => {
    if (user) {
      setIsDisable(true)
      const price = userCart.reduce((acc, current) => acc + current.actual_price * current.amount, 0)
      axios.post('/api/order', {
        id: user.id,
        status: 'Processed',
        price,
      })
        .then((res) => {
          const data = res.data
          console.log(userCart)
          const promise = userCart.map((el) => axios.post('/api/order/item', {
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

  return (
    <>
      {
        userCart.length > 0 ?
          <>
            <div className='gap-2 grid responsive-grid w-full'>
              {
                userCart.map((product, index) =>
                  <div className='flex flex-col' key={product.id}>
                    <ProductCard product={product} />
                    <div className='flex flex-row gap-2'>
                      <span>{product.amount}</span>
                      <button
                        disabled={product.amount < 9 ? false : true}
                        onClick={() => setUserCart(prev => [...prev.slice(0, index), { ...prev[index], amount: prev[index].amount + 1 }, ...prev.slice(index + 1)])}>
                        +
                      </button>
                      <button
                        disabled={product.amount > 1 ? false : true}
                        onClick={() => setUserCart(prev => [...prev.slice(0, index), { ...prev[index], amount: prev[index].amount - 1 }, ...prev.slice(index + 1)])}>
                        -
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
            <button disabled={isDisable} onClick={handleCreateOrder} className='bg-green-500'>
              Create order
            </button>
          </>
          :
          'Your cart is empty'
      }
    </>
  )
}