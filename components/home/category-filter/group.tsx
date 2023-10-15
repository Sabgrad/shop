import { useState } from "react"
import { Group } from "@/types/types"
import clsx from "clsx"
import { useFilterStore } from "@/context/zustand"

export default function Group({ group }: { group: Group }) {

  const [open, set] = useState(false)

  const { currentCategory, setCurrentCategory } = useFilterStore()

  return (
    <div className='flex flex-col border-maincolor-950 border-l'>
      <span onClick={() => set(prev => !prev)} className='pl-[0.375rem] font-semibold'>{group.title}</span>
      {
        open &&
        <div className="flex flex-col border-maincolor-950 border-l ml-[0.375rem]">
          {
            group.subCategory.map((category) =>
              <span
                onClick={() => setCurrentCategory(category.title)}
                className={clsx('pl-[0.375rem] hover:text-maincolor-100', currentCategory === category.title && 'text-maincolor-100')}
                key={category.title}
              >
                {category.title}
              </span>
            )
          }
        </div>
      }
    </div>
  )
}