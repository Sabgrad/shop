'use client'

import { MenuData } from '@/lib/data'
import React from 'react'
import Btn from '../buttons/btn'
import { useRouter } from 'next/navigation'
import { useStringStore, useSwitchStore } from '@/context/zustand'

export default function MenuBtns() {

  const { setActiveCatalog } = useSwitchStore()
  const { setCurrentSection } = useStringStore()
  const router = useRouter()

  const handleClick = (title: typeof MenuData[number]['title']) => {
    title === 'Catalog' && setActiveCatalog(true)
    if (title === 'Cart') {
      router.push('/user');
      setCurrentSection('My cart')
    }
  }

  return (
    <>
      {MenuData.map((btn) =>
        <Btn key={btn.title} className='!justify-start' onClick={() => handleClick(btn.title)}>
          {btn.icon} {btn.title}
        </Btn>
      )}
    </>
  )
}