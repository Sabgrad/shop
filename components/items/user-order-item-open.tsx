import React from 'react'
import Image from 'next/image'
import png from '@/public/png.png'
import TopBottomText from './top-bottom-text'

export default function UserOrderItemOpen() {
  return (
    <div className='flex  flex-col lg:flex-row w-full gap-2 py-2 border-b border-black/40'>
      <div className='flex flex-row gap-2 w-full lg:w-1/3 items-center'>
        <Image src={png} alt='png' className='max-h-16 max-w-[64px]'/>
        <span className='text-xs'>
          name name name namename namename namename dsad dasd asdsa dasd sad
        </span>
      </div>
      <div className='flex flex-row justify-between gap-2 w-full lg:w-2/3'>
        <TopBottomText top='Ціна' bottom='333$'/>
        <TopBottomText top='Кількість' bottom='2'/>
        <TopBottomText top='Сума' bottom='666$'/>
      </div>
    </div>
  )
}
