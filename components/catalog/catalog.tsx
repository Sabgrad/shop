'use client'

import { useSwitchStore } from '@/context/zustand'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import { mainCategorys } from '@/lib/data'
import clsx from 'clsx'
import CatalogItem from './catalog-item'
import { useTurnOffBodyScroll } from '@/hooks/useTurnOffBodyScroll'

export default function Catalog() {

  const { activeCatalog, setActiveCatalog } = useSwitchStore()

  const [currentCategory, setCurrentCategory] = useState('')

  const current = useMemo(() => {
    let current = mainCategorys.find(el => el.title === currentCategory)
    if (current) {
      let popular = current.groups.at(0)!
      let other = current.groups.slice(1)
      return { popular, other }
    }
    else {
      return null
    }
  }, [currentCategory])

  useTurnOffBodyScroll(activeCatalog)

  return (
    <>
      <AnimatePresence>
        {activeCatalog &&
          <div className='bg-maincolor-950/50 absolute h-full w-full top-0 left-0 text-black z-[900] flex justify-center sm:p-[55px]' onClick={() => setActiveCatalog()}>
            <motion.div
              className='bg-white gap-2 dark:bg-black flex flex-row h-full w-full p-1 sm:h-full sm:w-full sm:rounded border 
              dark:border-maincolor-50/30 border-maincolor-950/30 dark:text-white overflow-auto text-sm'
              key='menu'
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex flex-col w-max gap-1'>
                {
                  mainCategorys.map(el =>
                    <span
                      className={clsx(
                        'px-1 whitespace-nowrap border rounded border-maincolor-950/30 dark:border-maincolor-50/30',
                        el.title === currentCategory && 'bg-black text-white dark:text-black dark:bg-white'
                      )}
                      key={el.title}
                      onMouseEnter={() => setCurrentCategory(el.title)}

                    >
                      {el.title}
                    </span>
                  )
                }
              </div>
              <div>
                {
                  current ?
                    <>
                      <div className='flex flex-row max-w-full gap-1 flex-wrap'>
                        <CatalogItem title={current.popular.title} categorys={current.popular.subCategory} />
                        {current.other.map(el => <CatalogItem key={el.title} title={el.title} categorys={el.subCategory} />)}
                      </div>
                    </>
                    :
                    null
                }
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

    </>
  )
}