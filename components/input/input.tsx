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
  type?: 'number'
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
      className={clsx('p-1 border border-maincolor-100/40 rounded-lg outline-maincolor-100', className && className)}
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