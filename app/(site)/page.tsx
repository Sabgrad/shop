'use client'

import ProductCard from "@/components/cards/product-card"
import { ProductType } from "@/types/types"
import axios from "axios"
import { useEffect, useState } from "react"
import PriceFilterForm from "@/components/forms/price-filter-form"
import HomeCategoryFilter from "@/components/home/home-category-filter"
import HomePaginationBtn from "@/components/home/home-pagination-btn"
import ResponsiveGridLayout from "@/components/items/responsive-grid-layout"
import HomeFilterToggle from "@/components/home/home-filter-toggle"
import HomeSort from "@/components/home/home-sort"

const getPageCount = async (category: string, min: number, max: number,) => {
  const result = await axios.get('api/count', {
    params: {
      category,
      min,
      max
    }
  })

  return result.data
}

const getProducts = async (page: number, category: string, min: number, max: number, sortBy: string, orderBy: string) => {
  const result = await axios.get('api/product', {
    params: {
      page,
      category,
      min,
      max,
      sortBy,
      orderBy,
    }
  })

  return result.data
}

export default function Home() {

  const [products, setProducts] = useState<ProductType[]>([])

  const [filter, setFilter] = useState(true)

  const [pagination, setPagination] = useState(1)
  const [maxPagination, setMaxPagination] = useState(1)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPagination, setIsLoadingPagination] = useState(false)

  const [price, setPrice] = useState({ min: 0, max: 999999 })
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [sort, setSort] = useState({ sortBy: '', orderBy: '', })

  useEffect(() => {
    getPageCount(currentCategory, price.min, price.max)
      .then((res) => setMaxPagination(Math.ceil(res / Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE))))
  }, [currentCategory, price])


  useEffect(() => {
    if (pagination !== 1) {
      setIsLoadingPagination(true)
      getProducts(pagination, currentCategory, price.min, price.max, sort.sortBy, sort.orderBy)
        .then((res) => setProducts(prev => [...prev, ...res]))
        .finally(() => setIsLoadingPagination(false))
    }
  }, [pagination])

  useEffect(() => {
    setPagination(1)
    getProducts(1, currentCategory, price.min, price.max, sort.sortBy, sort.orderBy)
      .then((res) => setProducts(res))
  }, [price, currentCategory, sort])

  return (
    <div className="flex flex-col min-h-full gap-2">
      <div className="sticky top-[72px] p-2 z-[500] border-b  justify-between items-end  flex flex-row">
        <HomeFilterToggle setFilter={setFilter} />
        <HomeSort setSort={setSort} />
      </div>
      <div className="flex gap-2 flex-row p-2">
        {
          filter &&
          <div className="flex flex-col border-r border-black/40 min-w-max h-max px-2 gap-2">
            <PriceFilterForm price={price} setPrice={setPrice} />
            <HomeCategoryFilter currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
          </div>
        }
        <div className="flex min-h-max flex-col gap-4 w-full items-center">
          <ResponsiveGridLayout>
            {
              products.map((product) =>
                <ProductCard key={product.id} product={product} />
              )
            }
          </ResponsiveGridLayout>
          <HomePaginationBtn
            length={products.length !== 0}
            isLoadingPagination={isLoadingPagination}
            pagination={pagination}
            maxPagination={maxPagination}
            setPagination={setPagination}
          />
        </div>
      </div>
    </div >
  )
}