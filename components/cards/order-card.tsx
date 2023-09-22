import { userOrderType } from '@/types/types'
import React, { useState } from 'react'
import OrderItem from '../items/order-item'

type OrderCardProps = {
  order: userOrderType
}

export default function OrderCard({
  order
}: OrderCardProps) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div key={order.id} className='flex flex-col gap-2 border border-gray-700 p-1'>
        <span>
          {`Order ${order.id} Date: ${new Date(order.createdAt).toUTCString()}`}
        </span>
        <span>
          {`Status: ${order.status}`}
        </span>
        <span>
          {`Price: ${order.price}`}
        </span>
        <span>
          Payment: {order.paid ? `Paid in the amount of ${order.price}` : 'Pay for the order'}
        </span>
        <button onClick={() => setIsOpen(prev => !prev)}>
          Show products
        </button>
        {
          isOpen &&
          order.products.map((orderItem) =>
            <OrderItem orderItem={orderItem} key={orderItem.id} />
          )
        }
      </div>
    </div>
  )
}
