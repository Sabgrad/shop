import React from 'react'
import PriceFilterForm from '../forms/price-filter-form'
import HomeCategoryFilter from './category-filter/home-category-filter'

export default function Filter() {
  return (
    <div className="flex flex-col border-r border-black/40 min-w-max h-max gap-2 px-2">
      <span className="text-sm">
        Price range
      </span>
      <PriceFilterForm />
      <span className="text-sm">
        Category
      </span>
      <HomeCategoryFilter />
    </div>
  )
}