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
    <>
      {
        reviews.length ?
          <div className='flex flex-col gap-2 w-full px-2 sm:px-[15%]'>
            {
              reviews.map((review) =>
                <ReviewCard key={review.id} review={review} />
              )
            }
          </div>
          :
          null
      }
    </>
  )
}