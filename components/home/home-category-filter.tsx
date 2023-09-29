import { categorys } from '@/lib/data'
import clsx from 'clsx'
import React from 'react'
import { BsXSquare } from 'react-icons/bs'

type HomeCategoryFilterProps = {
  currentCategory: string
  setCurrentCategory: (value: string) => void
}

export default function HomeCategoryFilter({
  currentCategory,
  setCurrentCategory
}: HomeCategoryFilterProps) {

  const handleCategory = (title: string) => {
    setCurrentCategory(title)
  }

  return (
    <div className="flex overflow-auto flex-col gap-[2px]">
      {
        categorys.map((category) =>
          category.subCategory.map((item) =>
            <div className="flex flex-row w-full gap-1" key={item.title}>
              <span
                onClick={() => handleCategory(item.title)}
                className={clsx("rounded-lg hover:bg-white border-b px-1 w-full transition-all", item.title === currentCategory && '!bg-white')}
              >
                {item.title}
              </span>
              {
                item.title === currentCategory &&
                <BsXSquare size={24} className=' text-maincolor-600/50 hover:text-maincolor-600 transition-all' onClick={() => handleCategory('')} />
              }
            </div>
          )
        )
      }
    </div>
  )
}