'use client'

import ProductCard from "@/components/cards/product-card"
import { useState } from "react"
import PriceFilterForm from "@/components/forms/price-filter-form"
import HomeCategoryFilter from "@/components/home/category-filter/home-category-filter"
import HomePaginationBtn from "@/components/home/home-pagination-btn"
import HomeFilterToggle from "@/components/home/home-filter-toggle"
import HomeSort from "@/components/home/home-sort"
import { Product } from "@prisma/client"
import { useHomePageCurrentCategoryContext } from "@/context/home-current-category"
import { useFetchHomeByFilter, useFetchHomeByPagination, useFetchMaxHomePagination } from "@/hooks/tanstack-query/useQuery-hooks"

export default function Home() {

  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState(true)
  const [pagination, setPagination] = useState(1)
  const [price, setPrice] = useState({ min: 0, max: 999999 })
  const [sort, setSort] = useState({ sortBy: '', orderBy: '', })

  const { currentCategory } = useHomePageCurrentCategoryContext()

  const { data: maxPagination } = useFetchMaxHomePagination({ currentCategory, price })
  const { isFetching: isFetchingProduct } = useFetchHomeByFilter({ currentCategory, price, sort, setPagination, setProducts })
  const { isFetching: isFetchingPagination } = useFetchHomeByPagination({ currentCategory, pagination, price, sort, setProducts })

  return (
    <div className="relative flex flex-col min-h-full gap-2 pb-2">
      <div className="sticky top-[72px] z-[500] border-b border-b-maincolor-950 justify-between items-end  flex flex-row overflow-x-clip backdrop-blur-lg p-2">
        <HomeFilterToggle setFilter={setFilter} />
        <HomeSort setSort={setSort} />
      </div>
      <div className="flex gap-2 flex-row">
        {
          filter &&
          <div className="flex flex-col border-r border-black/40 min-w-max h-max gap-2 px-2">
            <span className="underline text-maincolor-100 text-sm">
              Price range
            </span>
            <PriceFilterForm price={price} setPrice={setPrice} />
            <span className="underline text-maincolor-100 text-sm">
              Category
            </span>
            <HomeCategoryFilter />
          </div>
        }
        <div className="flex min-h-max flex-col gap-4 w-full items-center pr-2">
          <div className="flex flex-row gap-2 flex-wrap justify-center">
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
          </div>
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