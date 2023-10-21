'use client'

import { useFetchUser } from '@/hooks/tanstack-query/useQuery-hooks'
import React from 'react'
import { copyTextToClipBoard as copy } from '@/lib/helpers'

export default function Me() {

  const { data: user } = useFetchUser()

  return (
    <div className='p-2 flex flex-col sm:grid sm:grid-cols-[max-content_max-content] sm:grid-rows-3 gap-2'>
      <span>
        ID:
      </span>
      <span className='hover:cursor-pointer' id={'Id'} onClick={(e: any) => copy(e.target.id)}>
        {user?.id}
      </span>
      <span>
        Name:
      </span>
      <span className='hover:cursor-pointer' id={'Name'} onClick={(e: any) => copy(e.target.id)}>
        {user?.name}
      </span>
      <span>
        Email:
      </span>
      <span className='hover:cursor-pointer' id={'Email'} onClick={(e: any) => copy(e.target.id)}>
        {user?.email}
      </span>
    </div>
  )
}