'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiOutlineMenu } from 'react-icons/ai'
import { useMenuContext } from '@/context/menu-context'

export default function MenuToggle() {

  const { setActiveMenu } = useMenuContext()

  return (
    <>
      <Btn className='text-maincolor-100' onClick={() => setActiveMenu(true)}>
        <AiOutlineMenu size={28} />
      </Btn>
    </>
  )
}
