'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSwitchStore } from '@/context/zustand'

export default function MenuToggle() {

  const { setActiveMenu } = useSwitchStore()

  return (
    <>
      <Btn onClick={() => setActiveMenu()}>
        <AiOutlineMenu size={28} />
      </Btn>
    </>
  )
}