'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Btn from '../buttons/btn'

export default function MenuToggleUser() {

  const session = useSession()
  const router = useRouter()

  return (
    <div className='w-full bg-maincolor-950/90 text-white'>
      {session.status === 'authenticated' ?
        <Btn className='rounded-none w-full !justify-start gap-2' onClick={() => router.push('/user')}>
          <span className='text-5xl'>
            {session.data.user?.name?.charAt(0).toUpperCase()}
          </span>
          <div className='flex flex-col items-start'>
            <span>
              {session.data.user?.name?.toUpperCase()}
            </span>
            <span className='text-sm'>
              {session.data.user?.email}
            </span>
          </div>
        </Btn>
        :
        <>
        </>
      }
    </div>
  )
}
