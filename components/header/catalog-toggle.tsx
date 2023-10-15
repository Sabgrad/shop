'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiOutlineAppstore } from 'react-icons/ai'
import { useSwitchStore } from '@/context/zustand'

export default function CatalogToggle() {

  const { setActiveCatalog } = useSwitchStore()

  return (
    <Btn className='gap-2  hidden lg:flex text-maincolor-100' onClick={() => setActiveCatalog()}>
      <AiOutlineAppstore size={28} /> Catalog
    </Btn>
  )
}