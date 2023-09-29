import { userOrderType } from '@/types/types'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Btn from '../buttons/btn'
import ResponsiveGridLayout from '../items/responsive-grid-layout'
import ProductCard from './product-card'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type OrderCardProps = {
  order: userOrderType
  setTriggerUpdateOrders: Dispatch<SetStateAction<number>>
}

export default function OrderCard({
  order,
  setTriggerUpdateOrders
}: OrderCardProps) {

  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handlePaid = () => {
    router.push(`/pay/${order.id}`)
  }

  const handleDelete = () => {
    axios.delete(`/api/order/${order.id}`)
      .then(() => setTriggerUpdateOrders(prev => prev + 1))
  }

  return (
    <div key={order.id} className='flex flex-col gap-2 border bg-white hover:border-maincolor-100 rounded-lg  p-1'>
      <div className='flex flex-row gap-2'>
        <div className='flex flex-col gap-2'>
          <span>
            Order:
          </span>
          <span>
            Date:
          </span>
          <span>
            Status:
          </span>
          <span>
            Price:
          </span>
          <span>
            Payment:
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <span>
            {order.id}
          </span>
          <span>
            {new Date(order.createdAt).toUTCString()}
          </span>
          <span>
            {order.status}
          </span>
          <span>
            {order.price + '\u20B4'}
          </span>
          <span>
            {
              order.paid ?
                `Paid in the amount of ${order.price}` :
                <Btn className='py-0 px-1 bg-maincolor-100/50 hover:!bg-maincolor-100' onClick={handlePaid}>
                  Pay for the order
                </Btn>
            }
          </span>
        </div>
      </div>
      <div className='flex w-full gap-2 flex-col sm:flex-row'>
        <Btn onClick={() => setIsOpen(prev => !prev)} className='bg-maincolor-100'>
          {isOpen ? 'Hide products' : 'Show products'}
        </Btn>
        <Btn onClick={handleDelete} className='bg-maincolor-100'>
          Delete order
        </Btn>
      </div>
      <ResponsiveGridLayout>
        {
          isOpen &&
          order.products.map((orderItem) =>
            <ProductCard amount={orderItem.amount} type='order' product={orderItem.product} key={orderItem.id} />
          )
        }
      </ResponsiveGridLayout>
    </div>
  )
}
