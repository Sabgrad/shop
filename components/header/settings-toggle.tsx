'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiFillSetting } from 'react-icons/ai'

export default function SettingsToggle() {

  return (
    <Btn className='hidden md:flex'>
      <AiFillSetting size={28} />
    </Btn>
  )
}
