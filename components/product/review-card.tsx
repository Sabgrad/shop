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
    <div className='flex flex-col p-2 rounded gap-2 border border-maincolor-950/30 dark:border-maincolor-50/30'>
      <span className='border-b border-maincolor-950/30 dark:border-maincolor-50/30'>{review.user.name} {review.rating}</span>
      <ReviewTextWrapper>
        {review.text}
      </ReviewTextWrapper>
    </div>
  )
}