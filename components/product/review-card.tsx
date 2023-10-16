import { ReviewProductPage } from '@/types/types'
import React from 'react'
import ReviewTextWrapper from './review-text-wrapper'

type ReviewCardProps = {
  review: ReviewProductPage
}

export default function ReviewCard({
  review
}: ReviewCardProps) {

  return (
    <div className='flex flex-col p-2 rounded-lg gap-2 border border-maincolor-950'>
      <span>{review.user.name} {review.rating}</span>
      <ReviewTextWrapper>
        {review.text}
      </ReviewTextWrapper>
    </div>
  )
}