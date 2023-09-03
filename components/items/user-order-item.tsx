'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import png from '@/public/png.png'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import clsx from 'clsx'
import UserOrderItemOpen from './user-order-item-open'
import TopBottomText from './top-bottom-text'
import LeftRightText from './left-right-text'

export default function UserOrderItem() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full p-2 flex flex-col gap-2 h-max border border-black/30 rounded-lg items-center'>

      <div className='w-full flex flex-row justify-between'>
        <div className='flex flex-row gap-2'>
          <div className='rounded-full h-full w-2 bg-green-600' />
          <div className='flex flex-col'>
            <span className='font-light text-sm'>
              #4235235 from 31.01.2010
            </span>
            <span>
              Виконано
            </span>
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='font-light text-sm'>
            Сума замовлення
          </span>
          <span>
            $213
          </span>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          {<Image src={png} alt='png' className={clsx('w-max max-h-[44px]', isOpen && 'opacity-0')} />}
          {React.createElement(isOpen ? AiOutlineUp : AiOutlineDown, { size: 15, className: 'text-green-500', onClick: () => setIsOpen(prev => !prev) })}
        </div>
      </div>

      {
        isOpen &&
        <div className='w-full gap-4 h-max p-4 flex flex-col xl:flex-row '>
          <div className='flex flex-col gap-4 w-full xl:w-1/2 xl:max-w-[20rem]'>
            <span>
              Інформація про замовлення
            </span>
            <span>
              Адерса Адреса ДАСРЕДРЕСАА адр.1 адр.10 f2.3f
            </span>
            <span>
              FirstNAme secondname
            </span>
            <span>
              phone number
            </span>
            <span>
              email@email.com
            </span>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <span>
              Товари
            </span>
            <UserOrderItemOpen />
            <UserOrderItemOpen />
            <UserOrderItemOpen />
            <UserOrderItemOpen />
            <UserOrderItemOpen />
            <LeftRightText left='Тип оплати' right='Оплата' />
            <LeftRightText left='9999999$' right='Разом' />
          </div>
        </div>
      }
    </div>
  )
}
