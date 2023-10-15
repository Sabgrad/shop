'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import Btn from '../buttons/btn'
import { AnimatePresence, motion } from 'framer-motion'
import { sortMenuData } from '@/lib/data'
import clsx from 'clsx'

type HomeSortProps = {
  sort: {
    sortBy: string,
    orderBy: string
  }
  setSort: Dispatch<SetStateAction<{ sortBy: string, orderBy: string }>>
}

export default function HomeSort({
  sort: sortProp,
  setSort
}: HomeSortProps) {

  const [openSort, setOpenSort] = useState(false)

  const handleSort = (sort_by: string, order_by: string) => {
    setSort({ sortBy: sort_by, orderBy: order_by })
  }

  return (
    <div className="flex flex-col relative">
      <Btn onClick={() => setOpenSort(prev => !prev)} className='bg-white border hover:!bg-maincolor-100'>
        Sort
      </Btn>
      <AnimatePresence>
        {openSort &&
          <motion.ul
            className=" z-[901] absolute top-[42px] -right-2  flex flex-col gap-1 w-max py-1 pl-1 border-l border-t border-b border-maincolor-950/30 rounded-l-lg bg-maincolor-100"
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
                className={clsx("py-1 transition-all rounded-l-lg hover:bg-maincolor-50 px-2", sort.type === sortProp.orderBy && sort.field === sortProp.sortBy && '!bg-white')}
                onClick={() => handleSort(sort.field, sort.type)}
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