import OrderCard from '@/components/cards/order-card'
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
        <OrderCard order={order} key={order.id} />
      )}
    </>
  )
}