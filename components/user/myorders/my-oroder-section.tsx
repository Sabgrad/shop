import OrderCard from '@/components/cards/order-card'
import { useUserContext } from '@/context/user-context'
import { userOrderType } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const getOrders = async (email: string) => {
  const res = await axios.get('api/user/order', {
    params: {
      user_email: email
    }
  })

  return res
}

const updateOrderPrice = (id: string, price: number) => {
  axios.patch(`api/order/${id}`, {
    price: price
  })
}

export default function MyOrder() {

  const { user } = useUserContext()
  const [orders, setOrders] = useState<userOrderType[]>([])
  const [triggerUpdatePrice, setTriggerUpdatePrice] = useState(0)
  const [triggerUpdateOrders, setTriggerUpdateOrders] = useState(0)

  useEffect(() => {
    if (user?.email) {
      getOrders(user.email)
        .then((res) => {
          setOrders(res.data)
        })
    }
  }, [user?.email, triggerUpdatePrice, triggerUpdateOrders])

  useEffect(() => {
    if (orders.length > 0) {
      let promise = new Array

      orders.forEach((el) => {
        let price = el.price
        let newPrice = el.products.reduce((acc, products) => acc + products.amount * products.product.actual_price, 0)

        if (price !== newPrice && el.paid === false) {
          promise.push(updateOrderPrice(el.id, newPrice))
        }
      })

      if (promise.length > 0) {
        Promise.all(promise).then(() => setTriggerUpdatePrice(prev => prev + 1))
      }
    }
  }, [orders])

  return (
    <>
      {orders?.map((order) =>
        <OrderCard order={order} key={order.id} setTriggerUpdateOrders={setTriggerUpdateOrders} />
      )}
    </>
  )
}