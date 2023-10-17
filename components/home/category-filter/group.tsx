import { useState } from "react"
import { Group } from "@/types/types"
import clsx from "clsx"
import { useFilterStore } from "@/context/zustand"

export default function Group({ group }: { group: Group }) {

  const [open, set] = useState(false)

  const { currentCategory, setCurrentCategory } = useFilterStore()

  return (
    <div className='flex flex-col border-maincolor-950/30 dark:border-maincolor-50/30 border-l'>
      <span onClick={() => set(prev => !prev)} className='pl-[0.375rem] font-normal'>{group.title}</span>
      {
        open &&
        <div className="flex flex-col border-maincolor-950/30 dark:border-maincolor-50/30 border-l ml-[0.375rem]">
          {
            group.subCategory.map((category) =>
              <span
                onClick={() => setCurrentCategory(category.title)}
                className={clsx(
                  'font-normal pl-[0.375rem] text-gray-500 hover:text-black dark:hover:text-white',
                  currentCategory === category.title && '!text-black dark:!text-white underline'
                )}
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