import { useState } from "react"
import { Group } from "@/types/types"
import clsx from "clsx"
import { useHomePageCurrentCategoryContext } from "@/context/home-current-category"

export default function Group({ group }: { group: Group }) {

  const [open, set] = useState(false)

  const { currentCategory, setCurrentCategory } = useHomePageCurrentCategoryContext()

  return (
    <div className='flex flex-col'>
      <span onClick={() => set(prev => !prev)} className='pl-[0.375rem] font-semibold'>{group.title}</span>
      {
        open &&
        group.subCategory.map((category) =>
          <span
            onClick={() => setCurrentCategory(category.title)}
            className={clsx('pl-[0.75rem] rounded-lg hover:bg-white', currentCategory === category.title && '!bg-maincolor-100')}
            key={category.title}
          >
            {category.title}
          </span>
        )
      }
    </div>
  )
}