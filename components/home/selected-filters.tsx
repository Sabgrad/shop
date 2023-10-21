import React, { useMemo } from 'react'
import Btn from '../buttons/btn'
import { sortMenuData } from '@/lib/data'
import { useFilterStore } from '@/context/zustand'

const INIT_PRICE = { min: 0, max: 999999 }
const INIT_SORT = { sortBy: '', orderBy: '' }

export default function SelectedFilters() {

  const { price, sort, currentCategory, clearPrice, clearSort, clearCategory, clearFilter } = useFilterStore()

  const hasFilters = useMemo(() => {
    let isPrice = JSON.stringify(price) !== JSON.stringify(INIT_PRICE)
    let isSort = JSON.stringify(sort) !== JSON.stringify(INIT_SORT)
    let isCategory = currentCategory !== ''

    if (isPrice || isSort || isCategory) return true
    else return false
  }, [price, sort, currentCategory])

  return (
    <div className="flex w-full justify-start gap-2 flex-wrap">
      {
        hasFilters &&
        <Btn onClick={() => clearFilter()}>
          Cancel filters
        </Btn>
      }
      {
        currentCategory &&
        <Btn onClick={() => clearCategory()}>
          {currentCategory}
        </Btn>
      }
      {
        (price.min !== 0 || price.max !== 999999) &&
        <Btn onClick={() => clearPrice()}>
          {'Price range: ' + price.min + '-' + price.max}
        </Btn>
      }
      {
        sort.sortBy !== '' && sort.orderBy !== '' &&
        <Btn onClick={() => clearSort()}>
          {sortMenuData.find((el) => el.field === sort.sortBy && el.type === sort.orderBy)?.title || 'Sort'}
        </Btn>
      }
    </div>
  )
}