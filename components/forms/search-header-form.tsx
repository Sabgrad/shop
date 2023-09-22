'use client'

import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Btn from '../buttons/btn'

export default function SearchHeaderForm() {

  return (
    <form className='w-full flex'>
      <div className='items-center rounded-l-lg hidden lg:flex bg-maincolor-100 text-maincolor-950 px-1'>
        <AiOutlineSearch size={24} />
      </div>
      <input placeholder='I search...' className='w-full rounded-l-lg lg:rounded-none text-maincolor-950 outline-none px-1' />
      <Btn className=' bg-maincolor-100 rounded-l-none'>
        Search
      </Btn>
    </form>
  )
}
