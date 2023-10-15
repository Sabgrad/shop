'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { usePathname, useRouter } from 'next/navigation'
import { useUserCartStorage, useStringStore } from '@/context/zustand'
import { useIsMount } from '@/hooks/usIsMount'

export default function CartToggle() {

  const { isMount } = useIsMount()
  const { userCart } = useUserCartStorage()
  const { currentSection, setCurrentSection } = useStringStore()
  const router = useRouter()
  const pathname = usePathname()

  const handleCart = () => {
    setCurrentSection('My cart')
    router.push('/user')
  }

  return (
    <Btn className='relative text-maincolor-100' onClick={handleCart} disabled={pathname === '/user' && currentSection === 'My cart'}>
      <AiOutlineShoppingCart size={28} />
      <span className='absolute text-white font-semibold text-sm -top-2 right-0'>
        {isMount ? userCart.length : 0}
      </span>
    </Btn>
  )
}