'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiFillSetting } from 'react-icons/ai'

export default function SettingsToggle() {

  return (
    <Btn className='hidden md:flex text-maincolor-100'>
      <AiFillSetting size={28} />
    </Btn>
  )
}
