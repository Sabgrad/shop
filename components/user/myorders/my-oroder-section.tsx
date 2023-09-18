import { useUserContext } from '@/context/user-context'
import { userOrderType } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MyOrder() {

  const { user } = useUserContext()

  const [orders, setOrders] = useState<userOrderType[]>([])

  useEffect(() => {
    if (user?.id) {
      axios.get('/api/user/order', {
        params: {
          userId: user.id
        }
      })
        .then((res) => {
          console.log(res.data)
          setOrders(res.data)
        })
    }
  }, [])

  return (
    <>
      {orders.map((order) =>
        <div key={order.id} className='flex flex-col gap-2'>
          <span>
            {`order ${new Date(order.createdAt).toUTCString()}`}
          </span>
          <span>
            {order.status}
          </span>
          <span>
            {order.price}
          </span>
          <span>
            {order.status}
          </span>
          <span>
            {order.paid.toString()}
          </span>
          {
            order.products.map((orderItem) =>
              <span key={orderItem.id}>
                {orderItem.product.name + orderItem.product.id}
              </span>)
          }
        </div>
      )}
    </>
  )
}