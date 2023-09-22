'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import Btn from '../buttons/btn'

type HomeSortProps = {
  setSort: Dispatch<SetStateAction<{ sortBy: string, orderBy: string }>>
}

export default function HomeSort({
  setSort
}: HomeSortProps) {

  const [openSort, setOpenSort] = useState(false)

  const handleSort = (sort_by: string, order_by: string) => {
    setSort({ sortBy: sort_by, orderBy: order_by })
  }

  return (
    <div className="flex flex-col relative">
      <Btn onClick={() => setOpenSort(prev => !prev)} className='bg-maincolor-100'>
        Sort
      </Btn>
      {openSort &&
        <ul className="absolute top-12 -right-2  flex flex-col gap-1 w-max p-1 border-l border-t border-b border-maincolor-950/30 transition-all rounded-l-lg bg-maincolor-100" onClick={() => setOpenSort(false)}>
          <li className="py-1 transition-all rounded-lg hover:bg-maincolor-50 px-2" onClick={() => handleSort('price', 'desc')}>
            Descending price
          </li>
          <li className="py-1 transition-all rounded-lg hover:bg-maincolor-50 px-2" onClick={() => handleSort('price', 'asc')}>
            Price ascending
          </li>
        </ul>
      }
    </div>
  )
}
