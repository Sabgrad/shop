import React from 'react'

type ProductPriceProps = {
  discount: number
  price: number
  actual_price: number
}

export default function ProductPrice({
  discount,
  price,
  actual_price,
}: ProductPriceProps) {
  return (
    <>
      {
        discount !== 0 ?
          <>
            <span className='line-through text-sm'>
              {price + '\u20B4'}
            </span>
            <span className='font-semibold text-2xl text-maincolor-500'>
              {actual_price + '\u20B4'}
            </span>
          </>
          :
          <span className='font-semibold text-2xl'>
            {actual_price + '\u20B4'}
          </span>
      }
    </>
  )
}
