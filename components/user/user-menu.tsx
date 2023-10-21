'use client'

import { UserMenuData } from '@/lib/data'
import React from 'react'
import Btn from '../buttons/btn'
import clsx from 'clsx'
import { useStringStore } from '@/context/zustand'

export default function UserMenu() {

  const { currentSection, setCurrentSection } = useStringStore()

  return (
    <div className='p-2 flex flex-row w-full  z-[500] gap-2 border-b border-maincolor-950/30 dark:border-maincolor-50/30 sticky left-0 top-[54px]'>
      {
        UserMenuData.map((el) =>
          <Btn
            key={el.title}
            onClick={() => setCurrentSection(el.title)}
            className={clsx('sm:!justify-start', currentSection === el.title && 'bg-maincolor-50  dark:bg-maincolor-50/30')}
          >
            {el.icon} {el.title}
          </Btn>
        )
      }
    </div>
  )
}