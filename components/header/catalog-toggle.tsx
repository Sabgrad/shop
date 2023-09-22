'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiOutlineAppstore } from 'react-icons/ai'
import { useCatalogContext } from '@/context/catalog-context'

export default function CatalogToggle() {

  const { setActiveCatalog } = useCatalogContext()

  return (
    <Btn className='gap-2  hidden lg:flex text-maincolor-100' onClick={() => setActiveCatalog(true)}>
      <AiOutlineAppstore size={28} /> Catalog
    </Btn>
  )
}
