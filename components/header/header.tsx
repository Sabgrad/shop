import Link from 'next/link'
import React from 'react'
import { AiOutlineMenu, AiFillShop, AiOutlineUser, AiOutlineAppstore, AiOutlineShoppingCart, AiOutlineSearch, AiFillSetting } from 'react-icons/ai'
import HeaderBtn from './header-btn'

export default function Header() {
  return (
    <header className="h-[4.5rem] z-[999] fixed top-0  bg-black/90 w-full px-1 sm:px-6 text-xl text-white">

      <div className='w-full h-full flex flex-row gap-2 justify-center items-center py-4'>
        <HeaderBtn>
          <AiOutlineMenu size={28} />
        </HeaderBtn>
        <Link href='/' className='flex justify-center items-center gap-2'>
          <AiFillShop size={28} /> <span className='text-3xl font-semibold hidden xl:block'>SHOP</span>
        </Link>
        <HeaderBtn className='gap-2 bg-gray-700 hidden lg:flex'>
          <AiOutlineAppstore size={28} /> Catalog
        </HeaderBtn>
        <form className='w-full flex h-full'>
          <div className='h-full items-center rounded-l-lg pl-1 bg-white text-black hidden lg:flex'>
            <AiOutlineSearch size={24} />
          </div>
          <input placeholder='I search...' className='w-full p-2 rounded-l-lg lg:rounded-none text-black outline-none' />
          <button className='h-full px-2 rounded-r-lg bg-green-500'>
            Search
          </button>
        </form>
        <HeaderBtn className='hidden md:flex relative'>
          <AiFillSetting size={28}/>
        </HeaderBtn>
        <HeaderBtn className='hidden sm:flex'>
          <AiOutlineUser size={28} />
        </HeaderBtn>
        <HeaderBtn className='relative'>
          <AiOutlineShoppingCart size={28} />
          <div className='absolute text-green-500 font-semibold text-sm -top-2 right-0'>
            1
          </div>
        </HeaderBtn>
      </div>
    </header>
  )
}