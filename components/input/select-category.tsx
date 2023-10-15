import { categorys, mainCategorys } from '@/lib/data'
import clsx from 'clsx'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type SelectCategoryProps = {
  className?: string
  register: UseFormRegister<FieldValues>
  required: boolean
  id: string
}

export default function SelectCategory({
  register,
  required,
  className,
  id
}: SelectCategoryProps) {
  return (
    <select
      className={clsx('p-1 border border-maincolor-950 rounded-lg outline-maincolor-950', className && className)}
      {...register(id, {
        required,
      })}
    >
      {
        mainCategorys.map((main) =>
          <React.Fragment key={main.title}>
            <optgroup className='text-maincolor-100' label={main.title} />
            {
              main.groups.map((el) =>
                <optgroup className='font-semibold' key={el.title} label={el.title}>
                  {el.subCategory.map((sub) =>
                    <option key={sub.title} value={sub.title}>
                      {sub.title}
                    </option>
                  )}
                </optgroup>
              )
            }
          </React.Fragment>
        )
      }
    </select>
  )
}