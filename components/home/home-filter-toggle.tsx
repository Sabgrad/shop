'use client'

import React, { Dispatch, SetStateAction } from 'react'
import Btn from '../buttons/btn'
import { BsFilterLeft } from 'react-icons/bs'

type HomeFilterToggleProps = {
  setFilter: Dispatch<SetStateAction<boolean>>
}

export default function HomeFilterToggle({
  setFilter
}: HomeFilterToggleProps) {
  return (
    <Btn onClick={() => setFilter(prev => !prev)} className="bg-maincolor-100">
      <BsFilterLeft size={28} /> Filters
    </Btn>
  )
}
