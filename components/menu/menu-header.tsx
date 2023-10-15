'use client'

import { useSwitchStore } from '@/context/zustand'
import React from 'react'
import { AiFillShop, AiOutlineClose } from 'react-icons/ai'

export default function MenuHeader() {

  const { setActiveMenu } = useSwitchStore()

  return (
    <div className='w-full bg-maincolor-950 text-maincolor-100 p-2 gap-2 flex flex-row items-center'>
      <AiFillShop size={28} />
      <span className=''>SHOP</span>
      <div className="ml-auto hover:bg-maincolor-300 hover:text-maincolor-950 p-2 rounded-lg transition-all" onClick={() => { setActiveMenu(), console.log('click') }}>
        <AiOutlineClose size={15} />
      </div>
    </div>
  )
}