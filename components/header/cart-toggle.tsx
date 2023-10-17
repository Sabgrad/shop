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
    <Btn className='relative' onClick={handleCart} disabled={pathname === '/user' && currentSection === 'My cart'}>
      <AiOutlineShoppingCart size={28} />
      <div className='absolute font-semibold text-sm -right-1 -top-2 text-maincolor-950 dark:text-white'>
        {isMount ? userCart.length : 0}
      </div>
    </Btn>
  )
}