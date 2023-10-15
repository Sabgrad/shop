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
    <>
      <UserMenu />
      <div className='w-full h-full p-6 flex flex-col gap-4'>
        {
          UserMenuData.find((el) => currentSection === el.title)?.section
        }
      </div>
    </>
  )
}
