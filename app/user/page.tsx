'use client'

import UserMenu from '@/components/user/user-menu'
import { useStringStore } from '@/context/zustand'
import { UserMenuData } from '@/lib/data'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function User() {

  const session = useSession()

  const { currentSection } = useStringStore()

  if (session.status !== 'authenticated') return null

  return (
    <div className='w-full min-h-full flex flex-col overflow-x-clip'>
      <UserMenu />
      <div className='w-full h-full p-2 flex flex-col gap-2'>
        {
          UserMenuData.find((el) => currentSection === el.title)?.section
        }
      </div>
    </div>
  )
}
