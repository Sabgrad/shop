'use client'

import ProductCard from "@/components/cards/product-card"
import { ProductType } from "@/types/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { categorys } from "@/lib/data"
import { BsXSquare, BsFilterLeft } from 'react-icons/bs'
import clsx from "clsx"

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

  const [filter, setfilter] = useState(true)
  const [openSort, setOpenSort] = useState(false)

  const [triggerToast, setTriggerToast] = useState(0)

  const [pagination, setPagination] = useState(1)
  const [maxPagination, setMaxPagination] = useState(1)

  const [isLoading, setIsLoading] = useState(false)

  const [price, setPrice] = useState({ min: 0, max: 999999 })
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [sort, setSort] = useState({ sortBy: '', orderBy: '', })

  const {
    handleSubmit,
    register,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      minPrice: price.min,
      maxPrice: price.max
    },
    mode: 'onSubmit'
  })

  useEffect(() => {
    getPageCount(currentCategory, price.min, price.max)
      .then((res) => setMaxPagination(Math.ceil(res / Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE))))
  }, [currentCategory, price])


  useEffect(() => {
    if (pagination !== 1) {
      getProducts(pagination, currentCategory, price.min, price.max, sort.sortBy, sort.orderBy)
        .then((res) => setProducts(prev => [...prev, ...res]))
    }
  }, [pagination])

  useEffect(() => {
    setPagination(1)
    getProducts(1, currentCategory, price.min, price.max, sort.sortBy, sort.orderBy)
      .then((res) => setProducts(res))
  }, [price, currentCategory, sort])

  useEffect(() => {
    if (errors.minPrice) {
      toast.error(errors.minPrice.message as string)
    }
    if (errors.maxPrice) {
      toast.error(errors.maxPrice.message as string)
    }
  }, [triggerToast, errors])

  const handleDownloadMore = () => {
    if (pagination !== maxPagination && pagination < maxPagination) {
      setPagination(prev => prev + 1)
    }
  }

  const priceRange: SubmitHandler<FieldValues> = (data) => {
    const { minPrice, maxPrice } = data
    if (price.min !== minPrice || price.max !== maxPrice) {
      setPrice({ min: data.minPrice, max: data.maxPrice })
    }
  }

  const handleSort = (sort_by: string, order_by: string) => {
    setSort({ sortBy: sort_by, orderBy: order_by })
  }

  const handleCategory = (title: string) => {
    setCurrentCategory(title)
  }

  return (
    <div className="h-full flex flex-col min-h-full gap-2">
      <div className="min-h-[4.5rem] sticky top-[72px] p-2 z-[500] bg-gray-50 border-b border-gray-200 justify-between items-end  flex flex-row">
        <button onClick={() => setfilter(prev => !prev)} className="flex flex-row gap-2 text-lg px-2 bg-blue-500 text-white hover:bg-blue-700 transition-all">
          <BsFilterLeft size={28}/> Filters
        </button>
        <div className="flex flex-col relative">
          <button onClick={() => setOpenSort(prev => !prev)}>
            Sort
          </button>
          {openSort &&
            <ul className="absolute top-8 right-0 bg-gray-100 flex flex-col gap-[2px] w-max p-[2px] border transition-all" onClick={() => setOpenSort(false)}>
              <li className="hover:bg-white p-1 transition-all" onClick={() => handleSort('price', 'desc')}>
                Descending price
              </li>
              <li className="hover:bg-white p-1 transition-all" onClick={() => handleSort('price', 'asc')}>
                Price ascending
              </li>
            </ul>
          }
        </div>
      </div>
      <div className="flex gap-2 flex-row p-2">
        {
          filter &&
          <div className="flex flex-col border-r border-black/40 min-w-max h-max px-2 gap-2">
            {/* price filter */}
            <form onSubmit={handleSubmit(priceRange)} className="gap-2 flex flex-col">
              <input
                id='minPrice'
                className="w-20"
                type="number"
                placeholder={price.min.toString()}
                {...register('minPrice', {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                  max: {
                    value: watch('maxPrice'),
                    message: 'no higher than the maximum price'
                  }
                })} />
              <input
                id='maxPrice'
                className="w-20"
                type="number"
                placeholder={price.max.toString()}
                {...register('maxPrice', {
                  required: true,
                  valueAsNumber: true,
                  min: {
                    value: watch('minPrice'),
                    message: 'no lower than the minimum price'
                  },
                  max: {
                    value: 999999,
                    message: 'maximum price 999999'
                  }
                })} />
              <button type="submit" className="bg-green-500/50 hover:bg-green-500 rounded-md p-[2px]" onClick={() => setTriggerToast(prev => prev + 1)}>
                OK
              </button>
            </form>
            {/* category filter */}
            <div className="flex overflow-auto h-[40rem] flex-col gap-[2px]">
              {
                categorys.map((category) =>
                  category.subCategory.map((item) =>
                    <div className="flex flex-row w-full" key={item.title}>
                      <span
                        onClick={() => handleCategory(item.title)}
                        className={clsx(" hover:bg-green-500/50 px-[2px] w-full transition-all", item.title === currentCategory && '!bg-green-500')}
                      >
                        {item.title}
                      </span>
                      {
                        item.title === currentCategory && <BsXSquare size={24} className='text-red-500/50 hover:text-red-600 transition-all' onClick={() => handleCategory('')} />
                      }
                    </div>
                  )
                )
              }
            </div>
          </div>
        }
        <div className="flex min-h-max flex-col w-full">
          <div className='gap-2 grid responsive-grid items-center max-h-full'>
            {
              products.map((product) =>
                <ProductCard key={product.id} product={product} />
              )
            }
          </div>
          {
            pagination !== maxPagination && pagination < maxPagination &&
            <button className=" w-max flex bg-gray-200 p-1 rounded-lg" onClick={handleDownloadMore}>
              Download more
            </button>
          }
        </div>
      </div>
    </div >
  )
}