'use client'

import clsx from 'clsx'
import React from 'react'
import { FieldValues, UseFormRegister, Validate, ValidateResult, ValidationValue } from 'react-hook-form'

type InputProps = {
  placeholder?: string
  className?: string
  id: string
  register: UseFormRegister<FieldValues>
  required: boolean
  minLength?: number
  maxLength?: number
  valueAsNumber?: boolean
  validate?: (v: number) => boolean
  type?: 'number' | 'password' | 'email' | 'text'
  min?: number
  max?: number
}

export default function Input({
  placeholder,
  className,
  id,
  register,
  required,
  minLength,
  maxLength,
  min,
  max,
  valueAsNumber,
  validate,
  type,
}: InputProps) {

  return (
    <input
      type={type}
      id={id}
      className={clsx('p-1 border rounded border-maincolor-950/30 dark:bg-black dark:border-maincolor-50/30', className && className)}
      placeholder={placeholder}
      {...register(id, {
        required,
        minLength: minLength || 1,
        maxLength: maxLength || 3000,
        valueAsNumber: valueAsNumber,
        validate: validate,
        min: min,
        max: max,
      })}
    />
  )
}