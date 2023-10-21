'use client'

import ReviewCard from '@/components/product/review-card'
import { useIsLoading } from '@/hooks/useIsLoading'
import { useFetchUser, useFetchUserReview } from '@/hooks/tanstack-query/useQuery-hooks'
import clsx from 'clsx'
import React from 'react'

export default function MyReviews() {

  const { data: user, isFetching: fetchUser } = useFetchUser()
  const { data: reviews, isFetching: fetchReviews } = useFetchUserReview({ id: user?.id! })

  const { isLoading } = useIsLoading([fetchReviews, fetchUser])

  return (
    <div className={clsx('flex flex-col gap-2 min-h-full', isLoading && 'justify-start items-center ')}>
      {
        isLoading ?
          <>Loading...</>
          :
          reviews?.map((review) =>
            <ReviewCard key={review.id} review={review} name={user?.name} />
          )
      }
    </div>
  )
}