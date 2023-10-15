'use client'

import { useSwitchStore } from '@/context/zustand'
import React from 'react'
import { AiFillShop, AiOutlineClose } from 'react-icons/ai'
import Btn from '../buttons/btn'

export default function MenuHeader() {

  const { setActiveMenu } = useSwitchStore()

  return (
    <div className='w-full bg-maincolor-950 p-2 gap-2 flex flex-row items-center text-white'>
      <AiFillShop size={28} />
      <span className=''>SHOP</span>
      <Btn onClick={() => setActiveMenu()} className='ml-auto'>
        <AiOutlineClose size={15} />
      </Btn>
    </div>
  )
}