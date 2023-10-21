'use client'

import { useFilterStore, useSwitchStore } from '@/context/zustand'
import Link from 'next/link'
import React from 'react'

type CatalogItemProps = {
  title: string
  categorys: { title: string }[]
}

export default function CatalogItem({
  title,
  categorys
}: CatalogItemProps) {

  const { setCurrentCategory } = useFilterStore()
  const { setActiveCatalog } = useSwitchStore()

  return (
    <div className='flex flex-col gap-1'>
      <span className='px-1 rounded border border-maincolor-950/30 dark:border-maincolor-50/30 dark:bg-white dark:text-black bg-black text-white'>
        {title}
      </span>
      {
        categorys.map(el =>
          <Link
            href='/'
            className='px-1 rounded border border-maincolor-950/30 dark:border-maincolor-50/30 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white'
            onClick={() => { setCurrentCategory(el.title), setActiveCatalog(false) }}
            key={el.title}
          >
            {el.title}
          </Link>
        )
      }
    </div>
  )
}