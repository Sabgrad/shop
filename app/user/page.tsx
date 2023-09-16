'use client'

import MenuBtn from '@/components/buttons/menu-btn'
import { useUserPageCurrentSection } from '@/context/user-current-section'
import { UserMenuData } from '@/lib/data'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function User() {

  const session = useSession()

  const { currentSection, setCurrentSection } = useUserPageCurrentSection()

  if (session.status !== 'authenticated') return null

  return (
    <>
      <div className=' w-64 h-full p-2 flex flex-col z-[500] gap-2 border-r border-r-black/30 sticky left-0 top-[72px]'>
        <div className={clsx('w-full flex flex-row gap-2 p-1 rounded-lg', currentSection === 'User' && 'bg-green-500/20')} onClick={() => setCurrentSection('User')}>
          <div className='font-semibold text-2xl p-2 rounded-full h-10 w-10 flex justify-center items-center'>
            {session.data.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className='flex flex-col h-10'>
            <span className='text-base'>
              {session.data.user?.name}
            </span>
            <span className='text-xs'>
              {session.data.user?.email}
            </span>
          </div>
        </div>
        {
          UserMenuData.map((el) =>
            <MenuBtn key={el.title} onClick={() => setCurrentSection(el.title)} className={currentSection === el.title ? 'bg-green-500/20' : ''}>
              {el.icon} {el.title}
            </MenuBtn>
          )
        }
      </div>
      <div className='w-full h-full p-2 flex flex-col gap-4'>
        {
          currentSection === 'User' ?
            <>user</>
            :
            UserMenuData.find((el) => currentSection === el.title)?.section
        }
      </div>
    </>
  )
}
