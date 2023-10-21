import React from 'react'

type ProductPriceItemProps = {
  discount: number
  price: number
  actual_price: number
}

export default function ProductPriceItem({
  discount,
  price,
  actual_price
}: ProductPriceItemProps) {
  return (
    <div className='flex flex-col w-full gap-1 h-[44px] justify-end'>
      {
        discount === 0 ?
          <span>{price} {' \u20B4'}</span>
          :
          <>
            <span className='text-xs line-through'>{price + ' \u20B4'}</span>
            <span className='text-maincolor-500'>{actual_price + ' \u20B4'}</span>
          </>
      }
    </div>
  )
}