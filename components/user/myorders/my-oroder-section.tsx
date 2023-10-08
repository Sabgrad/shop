import OrderCard from '@/components/cards/order-card'
import { useUserContext } from '@/context/user-context'
import React from 'react'
import { useFetchUserOrders } from '@/hooks/tanstack-query/useQuery-hooks'
import { useUpdateOrderPrice } from '@/hooks/tanstack-query/useMutation-hooks'

export default function MyOrder() {

  const { user } = useUserContext()

  const { mutate: updateOrderPrice } = useUpdateOrderPrice()

  const { data: orders } = useFetchUserOrders({ email: user?.email, updateOrderPrice })

  return (
    <>
      {orders?.map((order) =>
        <OrderCard order={order} key={order.id} />
      )}
    </>
  )
}