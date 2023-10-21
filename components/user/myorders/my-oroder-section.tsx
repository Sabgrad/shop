import OrderCard from '@/components/cards/ordercard/order-card'
import React from 'react'
import { useFetchUserOrders } from '@/hooks/tanstack-query/useQuery-hooks'
import { useUpdateOrderPrice } from '@/hooks/tanstack-query/useMutation-hooks'

export default function MyOrder() {

  const { mutate: updateOrderPrice } = useUpdateOrderPrice()

  const { data: orders } = useFetchUserOrders({ updateOrderPrice })

  return (
    <>
      {orders?.map((order) =>
        <OrderCard order={order} key={order.id} />
      )}
    </>
  )
}