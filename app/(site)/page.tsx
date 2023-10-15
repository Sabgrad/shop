'use client'

import ProductCard from "@/components/cards/product-card"
import { useState } from "react"
import PriceFilterForm from "@/components/forms/price-filter-form"
import HomeCategoryFilter from "@/components/home/category-filter/home-category-filter"
import HomePaginationBtn from "@/components/home/home-pagination-btn"
import HomeFilterToggle from "@/components/home/home-filter-toggle"
import HomeSort from "@/components/home/home-sort"
import { Product } from "@prisma/client"
import { useFetchHomeByFilter, useFetchHomeByPagination, useFetchMaxHomePagination } from "@/hooks/tanstack-query/useQuery-hooks"
import FlexLayout from "@/components/items/flex-layout"
import SelectedFilters from "@/components/home/selected-filters"
import { useFilterStore } from "@/context/zustand"
import Filter from "@/components/home/filter"

export default function Home() {

  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState(true)
  const [pagination, setPagination] = useState(1)

  const { price, sort, currentCategory } = useFilterStore()

  const { data: maxPagination } = useFetchMaxHomePagination({ currentCategory, price })
  const { isFetching: isFetchingProduct } = useFetchHomeByFilter({ currentCategory, price, sort, setPagination, setProducts })
  const { isFetching: isFetchingPagination } = useFetchHomeByPagination({ currentCategory, pagination, price, sort, setProducts })

  return (
    <div className="relative flex flex-col min-h-full gap-2 pb-2">
      <div className="sticky top-[72px] z-[500] border-b gap-2 border-b-maincolor-950 items-end justify-between  flex flex-row overflow-x-clip backdrop-blur-lg p-2">
        <HomeFilterToggle setFilter={setFilter} />
        <SelectedFilters />
        <HomeSort />
      </div>
      <div className="flex gap-2 flex-row">
        {filter && <Filter />}
        <div className="flex min-h-max flex-col gap-4 w-full items-center pr-2">
          <FlexLayout>
            {
              isFetchingProduct ?
                <>Loading...</>
                :
                products.length > 0 ?
                  products.map((product) =>
                    <ProductCard key={product.id} product={product} />
                  )
                  :
                  products.length === 0 &&
                  <>Product didnt found</>
            }
          </FlexLayout>
          {
            maxPagination && maxPagination > 0 ?
              <HomePaginationBtn
                pagination={pagination}
                isLoadingPagination={isFetchingPagination}
                maxPagination={maxPagination}
                setPagination={setPagination}
                length={products.length !== 0}
              />
              :
              null
          }
        </div>
      </div>
    </div >
  )
}