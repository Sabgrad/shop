'use client'

import React from 'react'
import Input from '../input/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Btn from '../buttons/btn'
import toast from 'react-hot-toast'
import { useFilterStore } from '@/context/zustand'

export default function PriceFilterForm() {

  const { price, setPrice } = useFilterStore()

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      minPrice: price.min,
      maxPrice: price.max
    },
    mode: 'all'
  })

  const handleError = () => {
    const min = getValues().minPrice
    const max = getValues().maxPrice

    if (min > max) {
      toast.error('Minimum cant be lower than maximum')
      setValue('minPrice', 0)
      setValue('maxPrice', 999999)
    }
    if (min < 0) {
      toast.error('Price cant be lower than 0')
      setValue('minPrice', 0)
    }
    if (max > 999999) {
      toast.error('Price cant be higher than 999,999')
      setValue('maxPrice', 999999)
    }
  }

  const priceRange: SubmitHandler<FieldValues> = (data) => {
    const { minPrice, maxPrice } = data
    if (price.min !== minPrice || price.max !== maxPrice) {
      setPrice(data.minPrice, data.maxPrice)
    }
  }

  return (
    <form onSubmit={handleSubmit(priceRange)} className="gap-2 flex flex-row w-full">
      <Input
        className='w-[5rem]'
        placeholder={price.min.toString()}
        type='number'
        id='minPrice'
        register={register}
        required
        valueAsNumber
        min={0}
        max={getValues().maxPrice}
      />
      <Input
        className='w-[5rem]'
        placeholder={price.max.toString()}
        type='number'
        id='maxPrice'
        register={register}
        required
        valueAsNumber
        min={getValues().minPrice}
        max={999999}
      />
      <Btn className="w-full" type="submit" onClick={() => handleError()}>
        OK
      </Btn>
    </form>
  )
}
