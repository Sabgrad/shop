import React, { useMemo } from 'react'
import Btn from '../buttons/btn'
import { sortMenuData } from '@/lib/data'
import { useFilterStore } from '@/context/zustand'

export default function SelectedFilters() {

  const { price, setPrice, sort, setSort, currentCategory, setCurrentCategory } = useFilterStore()

  const hasFilters = useMemo(() => {
    let has = false
    let isPrice = JSON.stringify(price) !== JSON.stringify({ min: 0, max: 999999 })
    let isSort = JSON.stringify(sort) !== JSON.stringify({ sortBy: '', orderBy: '' })
    let isCategory = currentCategory !== ''
    if (isPrice || isSort || isCategory) {
      has = true
    }
    return has
  }, [price, sort, currentCategory])

  const handleDeleteFilters = () => {
    setCurrentCategory('')
    setPrice(0, 999999)
    setSort('', '')
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
        <Btn onClick={() => setCurrentCategory('')}>
          {currentCategory}
        </Btn>
      }
      {
        (price.min !== 0 || price.max !== 999999) &&
        <Btn onClick={() => setPrice(0, 999999)}>
          {'Price range: ' + price.min + '-' + price.max}
        </Btn>
      }
      {
        sort.sortBy !== '' && sort.orderBy !== '' &&
        <Btn onClick={() => setSort('', '')}>
          {sortMenuData.find((el) => el.field === sort.sortBy && el.type === sort.orderBy)?.title || 'Sort'}
        </Btn>
      }
    </div>
  )
}