'use client'

import React, { useState } from 'react'
import Btn from '../buttons/btn'
import { AnimatePresence, motion } from 'framer-motion'
import { sortMenuData } from '@/lib/data'
import clsx from 'clsx'
import { useFilterStore } from '@/context/zustand'

export default function HomeSort() {

  const [openSort, setOpenSort] = useState(false)

  const { sort: sortState, setSort } = useFilterStore()

  return (
    <div className="flex flex-col relative">
      <Btn onClick={() => setOpenSort(prev => !prev)}>
        Sort
      </Btn>
      <AnimatePresence>
        {openSort &&
          <motion.ul
            className={clsx(
              "z-[901] absolute top-[42px] -right-2  flex flex-col gap-1 w-max py-1 pl-1 border-l rounded-bl border-y",
              'dark:border-maincolor-50/30 border-maincolor-950/30 dark:bg-black bg-white'
            )}
            onClick={() => setOpenSort(false)}
            key={'sort'}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            {sortMenuData.map((sort) =>
              <li
                key={sort.title}
                className={clsx("py-1 transition-all rounded-l px-2 border-y border-l",
                  sort.type === sortState.orderBy && sort.field === sortState.sortBy && 'dark:bg-maincolor-50/30 bg-maincolor-50',
                  'dark:border-maincolor-50/30 border-maincolor-950/30 dark:hover:bg-maincolor-50/30 hover:bg-maincolor-50'
                )}
                onClick={() => setSort(sort.field, sort.type)}
              >
                {sort.title}
              </li>
            )}
          </motion.ul>
        }
      </AnimatePresence>
    </div>
  )
}