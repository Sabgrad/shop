'use client'

import { useUserPageCurrentSection } from '@/context/user-current-section'
import { UserMenuData } from '@/lib/data'
import React, { useEffect, useState } from 'react'
import Btn from '../buttons/btn'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import clsx from 'clsx'

export default function UserMenu() {

  const { currentSection, setCurrentSection } = useUserPageCurrentSection()
  const [open, setOpen] = useState(true)
  const [sm, setSm] = useState(false)

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 640) {
        setSm(true)
      } else {
        setSm(false)
      }
    }

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <>
      {
        open ?

          <div className='sm:w-max h-full py-6 px-2 flex flex-col w-full  z-[500] gap-2 sm:border-r border-r-black/30 fixed sm:sticky left-0 top-[72px] bg-maincolor-50'>
            {
              UserMenuData.map((el) =>
                <Btn
                  key={el.title}
                  onClick={() => { setCurrentSection(el.title), sm && setOpen(false) }}
                  className={clsx('sm:!justify-start', currentSection === el.title && 'bg-maincolor-100')}
                >
                  {el.icon} {el.title}
                </Btn>
              )
            }
            <AiOutlineArrowLeft
              onClick={() => setOpen(prev => !prev)}
              className='absolute top-0 right-0 z-[500] bg-maincolor-100 hover:bg-maincolor-300 rounded-sm'
              size={20}
            />
          </div>
          :
          <AiOutlineArrowRight
            onClick={() => setOpen(prev => !prev)}
            className='absolute top-[72px] left-0 z-[500] bg-maincolor-100 hover:bg-maincolor-300 rounded-sm'
            size={20}
          />
      }
    </>
  )
}
