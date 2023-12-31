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
    <Btn onClick={() => setFilter(prev => !prev)}>
      <BsFilterLeft size={24} /> Filters
    </Btn>
  )
}
