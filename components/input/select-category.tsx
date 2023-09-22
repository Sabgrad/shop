import { categorys } from '@/lib/data'
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
      className={clsx('p-1 border border-maincolor-100/40 rounded-lg outline-maincolor-100', className && className)}
      {...register(id, {
        required,
      })}
    >
      {
        categorys.map((category) =>
          <optgroup key={category.title} label={category.title}>
            {
              category.subCategory.map((subCategory) =>
                <option key={subCategory.title} value={subCategory.title}>
                  {subCategory.title}
                </option>
              )
            }
          </optgroup>
        )
      }
    </select>
  )
}
