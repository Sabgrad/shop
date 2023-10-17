'use client'

import { useFetchUser } from '@/hooks/tanstack-query/useQuery-hooks'
import React, { useMemo } from 'react'
import ReviewForm from '../forms/review-form'
import ReviewCard from './review-card'
import { ReviewProductPage } from '@/types/types'

type UserReviewProps = {
  reviews: ReviewProductPage[]
  id: string
}

type UserReview = ReviewProductPage | undefined

export default function UserReview({
  reviews,
  id
}: UserReviewProps) {
  const { data: user } = useFetchUser()

  const review: UserReview = useMemo(() => {
    let userReview = undefined
    if (user?.id) {
      userReview = reviews.find((el) => el.user.id === user.id)
    }
    return userReview
  }, [reviews, user])

  return (
    <div className='px-2 sm:px-[15%] border-b py-2 border-maincolor-950/30 dark:border-maincolor-50/30'>
      {
        !user?.id ?
          <>Sign in if u want left review</>
          :
          review ?
            <>
              Your review:
              <ReviewCard review={review} />
            </>
            :
            <ReviewForm productId={id} userId={user.id} />
      }
    </div>
  )
}
