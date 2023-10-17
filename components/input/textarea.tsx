'use client'

import clsx from 'clsx'
import React from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

type TextAreaProps = {
  placeholder?: string
  className?: string
  id: string
  register: UseFormRegister<FieldValues>
  required: boolean
  minLength?: number
  maxLength?: number
}

export default function TextArea({
  placeholder,
  className,
  id,
  register,
  required,
  minLength,
  maxLength,
}: TextAreaProps) {
  return (

    <textarea
      id={id}
      className={clsx('p-1 border rounded border-maincolor-950/30 dark:bg-black dark:border-maincolor-50/30', className && className)}
      placeholder={placeholder}
      {...register(id, {
        required,
        minLength: minLength || 0,
        maxLength: maxLength || 3000,
      })}
    />
  )
}
