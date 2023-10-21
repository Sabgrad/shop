'use client'

import UserMenu from '@/components/user/user-menu'
import { useStringStore } from '@/context/zustand'
import { UserMenuData } from '@/lib/data'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function User() {

  const session = useSession()

  const { currentSection } = useStringStore()

  return (
    <div className={clsx('w-full min-h-full flex flex-col overflow-x-clip', session.status !== 'authenticated' && 'justify-center items-center')}>
      {
        session.status === 'authenticated' ?
          <>
            <UserMenu />
            <div className='w-full min-h-full p-2 flex flex-col gap-2'>
              {
                UserMenuData.find((el) => currentSection === el.title)?.section
              }
            </div>
          </>
          :
          session.status === 'loading' ?
            <>Loading...</>
            :
            session.status === 'unauthenticated' ?
              <>Auth for page</>
              :
              null
      }
    </div>
  )
}
