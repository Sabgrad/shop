import React, { Dispatch, SetStateAction, useMemo } from 'react'
import Btn from '../buttons/btn'
import { iS, sortMenuData } from '@/lib/data'
import { useStringStore } from '@/context/zustand'

type SelectedFilters = {
  price: {
    min: number
    max: number
  }
  setPrice: Dispatch<SetStateAction<{ min: number, max: number }>>
  sort: {
    sortBy: string
    orderBy: string
  }
  setSort: Dispatch<SetStateAction<{ sortBy: string, orderBy: string }>>
}

export default function SelectedFilters({
  price,
  setPrice,
  sort,
  setSort,
}: SelectedFilters) {

  const { currentCategory, setCurrentCategory } = useStringStore()

  const hasFilters = useMemo(() => {
    let has = false
    let isPrice = JSON.stringify(price) !== JSON.stringify(iS.homePriceState)
    let isSort = JSON.stringify(sort) !== JSON.stringify(iS.homeSortState)
    let isCategory = currentCategory !== ''
    if (isPrice || isSort || isCategory) {
      has = true
    }
    return has
  }, [price, sort, currentCategory])

  const handleDeleteFilters = () => {
    setCurrentCategory('')
    setPrice(iS.homePriceState)
    setSort(iS.homeSortState)
  }

  return (
    <div className="flex w-full justify-start gap-2 flex-wrap">
      {
        hasFilters &&
        <Btn onClick={() => handleDeleteFilters()}>
          Cancel filters
        </Btn>
      }
      {
        currentCategory &&
        <Btn className="border bg-white hover:!bg-maincolor-100" onClick={() => setCurrentCategory('')}>
          {currentCategory}
        </Btn>
      }
      {
        (price.min !== 0 || price.max !== 999999) &&
        <Btn className="border bg-white hover:!bg-maincolor-100" onClick={() => setPrice({ min: 0, max: 999999 })}>
          {'Price range: ' + price.min + '-' + price.max}
        </Btn>
      }
      {
        sort.sortBy !== '' && sort.orderBy !== '' &&
        <Btn className="border bg-white hover:!bg-maincolor-100" onClick={() => setSort({ sortBy: '', orderBy: '' })}>
          {sortMenuData.find((el) => el.field === sort.sortBy && el.type === sort.orderBy)?.title || 'Sort'}
        </Btn>
      }
    </div>
  )
}