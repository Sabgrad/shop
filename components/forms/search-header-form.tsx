'use client'

import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Btn from '../buttons/btn'

export default function SearchHeaderForm() {

  return (
    <form className='w-full flex'>
      <div className='items-center rounded-l-lg hidden lg:flex text-maincolor-950 px-1 border-black border-y border-l'>
        <AiOutlineSearch size={24} />
      </div>
      <input placeholder='I search...' className='w-full rounded-l-lg lg:rounded-none text-maincolor-950 outline-none px-1 border-black border-y border-l' />
      <Btn className='rounded-l-none'>
        Search
      </Btn>
    </form>
  )
}
