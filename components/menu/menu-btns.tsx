'use client'

import { MenuData } from '@/lib/data'
import React from 'react'
import Btn from '../buttons/btn'
import { useRouter } from 'next/navigation'
import { useCatalogContext } from '@/context/catalog-context'
import { useUserPageCurrentSectionContext } from '@/context/user-current-section'

export default function MenuBtns() {

  const { setActiveCatalog } = useCatalogContext()
  const { setCurrentSection } = useUserPageCurrentSectionContext()
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