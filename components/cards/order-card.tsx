'use client'

import React, { useState } from 'react'
import Btn from '../buttons/btn'
import ProductCard from './product-card'
import { useRouter } from 'next/navigation'
import { Orders } from '@/types/types'
import FlexLayout from '../items/flex-layout'

type OrderCardProps = {
  order: Orders
}

export default function OrderCard({
  order,
}: OrderCardProps) {

  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handlePaid = () => {
    router.push(`/pay/${order.id}`)
  }

  return (
    <div key={order.id}
      className='flex flex-col gap-2 border  rounded p-2 dark:border-maincolor-50/30 border-maincolor-950/30 dark:bg-black hover:bg-maincolor-950/10 bg-white dark:hover:bg-maincolor-50/30'
    >
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
                <Btn className='py-0 px-1' onClick={handlePaid}>
                  Pay for the order
                </Btn>
            }
          </span>
        </div>
      </div>
      <div className='flex w-full gap-2 flex-col sm:flex-row'>
        <Btn onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? 'Hide products' : 'Show products'}
        </Btn>
        {
          !order.paid &&
          <Btn>
            Delete order
          </Btn>
        }
      </div>
      <FlexLayout>
        {
          isOpen &&
          order.products.map((orderItem) =>
            // @ts-ignore
            <ProductCard amount={order.options[orderItem.id]} type='order' product={orderItem} key={orderItem.id} />
          )
        }
      </FlexLayout>
    </div>
  )
}
