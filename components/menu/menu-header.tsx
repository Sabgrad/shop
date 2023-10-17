'use client'

import { useSwitchStore } from '@/context/zustand'
import React from 'react'
import { AiFillShop, AiOutlineClose } from 'react-icons/ai'
import Btn from '../buttons/btn'

export default function MenuHeader() {

  const { setActiveMenu } = useSwitchStore()

  return (
    <div className='w-full p-2 gap-2 flex flex-row items-center'>
      <AiFillShop size={28} />
      <span className=''>SHOP</span>
      <Btn onClick={() => setActiveMenu()} className='ml-auto'>
        <AiOutlineClose size={15} />
      </Btn>
    </div>
  )
}