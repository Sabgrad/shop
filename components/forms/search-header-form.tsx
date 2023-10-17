'use client'

import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Btn from '../buttons/btn'

export default function SearchHeaderForm() {

  return (
    <form className='w-full flex'>
      <div className='items-center rounded-l-lg hidden lg:flex  px-1  border-y border-l dark:border-maincolor-50/30 border-maincolor-950/30'>
        <AiOutlineSearch size={24} />
      </div>
      <input placeholder='I search...' className='w-full rounded-l-lg lg:rounded-none outline-none px-1 border-y border-l border-maincolor-950/30 dark:bg-black dark:border-maincolor-50/30' />
      <Btn className='rounded-l-none'>
        Search
      </Btn>
    </form>
  )
}
