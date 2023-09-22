'use client'

import { useUserPageCurrentSection } from '@/context/user-current-section'
import { UserMenuData } from '@/lib/data'
import React from 'react'
import Btn from '../buttons/btn'

export default function UserMenu() {

  const { setCurrentSection } = useUserPageCurrentSection()

  return (
    <div className='w-max h-full p-2 flex flex-col z-[500] gap-2 border-r border-r-black/30 sticky left-0 top-[72px]'>
      {
        UserMenuData.map((el) =>
          <Btn key={el.title} onClick={() => setCurrentSection(el.title)} className='!justify-start'>
            {el.icon} {el.title}
          </Btn>
        )
      }
    </div>
  )
}
