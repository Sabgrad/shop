import Link from 'next/link'
import React from 'react'
import { AiFillShop } from 'react-icons/ai'

export default function ShopToggle() {

  return (
    <Link href='/' className='flex justify-center items-center gap-2 dark:text-white'>
      <AiFillShop size={28} /> SHOP
    </Link>
  )
}