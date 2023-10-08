'use client'

import React from 'react'
import Btn from '../buttons/btn'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCartContext } from '@/context/cart-context'
import { usePathname, useRouter } from 'next/navigation'
import { useUserPageCurrentSectionContext } from '@/context/user-current-section'

export default function CartToggle() {

  const { userCart } = useCartContext()
  const { currentSection, setCurrentSection } = useUserPageCurrentSectionContext()
  const router = useRouter()
  const pathname = usePathname()

  const handleCart = () => {
    setCurrentSection('My cart')
    router.push('/user')
  }

  return (
    <Btn className='relative text-maincolor-100' onClick={handleCart} disabled={pathname === '/user' && currentSection === 'My cart'}>
      <AiOutlineShoppingCart size={28} />
      <div className='absolute text-white font-semibold text-sm -top-2 right-0'>
        {userCart.length}
      </div>
    </Btn>
  )
}