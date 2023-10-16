import React from 'react'
import ReviewCard from './review-card'
import { ReviewProductPage } from '@/types/types'

type ReviewsProps = {
  reviews: ReviewProductPage[]
}

export default function Reviews({
  reviews,
}: ReviewsProps) {
  return (
    <div className='flex flex-col gap-2'>
      {
        reviews.length ?
          reviews.map((review) =>
            <ReviewCard review={review} />
          )
          :
          <>Reviews didnt found</>
      }
    </div>
  )
}
