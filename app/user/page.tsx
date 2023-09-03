'use client'

import MenuBtn from '@/components/buttons/menu-btn'
import UserOrderItem from '@/components/items/user-order-item'
import { useUserContext } from '@/context/user-context'
import { UserMenuData } from '@/lib/data'
import axios from 'axios'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { revalidatePath, revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import { category } from '@/lib/data'

console.log(category)

type SectionType = typeof UserMenuData[number]['title']

export default function User() {

  const session = useSession()
  const router = useRouter()

  const { user, product, triggerProductRequest } = useUserContext()

  const [currentSection, setCurrentSection] = useState<SectionType | 'User'>('My shop')

  const {
    handleSubmit,
    reset,
    register,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      discount: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post('/api/product', {
      ...data,
      userId: user?.id
    })
      .then(() => { triggerProductRequest() })
  }

  if (session.status !== 'authenticated') return null

  return (
    <>
      <div className=' w-64 h-full p-2 flex flex-col gap-2 border-r border-r-black/30 fixed left-0'>
        <div className={clsx('w-full flex flex-row gap-2 p-1 rounded-lg', currentSection === 'User' && 'bg-green-500/20')} onClick={() => setCurrentSection('User')}>
          <div className='font-semibold text-2xl p-2 rounded-full h-10 w-10 flex justify-center items-center'>
            {session.data.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className='flex flex-col h-10'>
            <span className='text-base'>
              {session.data.user?.name}
            </span>
            <span className='text-xs'>
              {session.data.user?.email}
            </span>
          </div>
        </div>
        {
          UserMenuData.map((el) =>
            <MenuBtn key={el.title} onClick={() => setCurrentSection(el.title)} className={currentSection === el.title ? 'bg-green-500/20' : ''}>
              {el.icon} {el.title}
            </MenuBtn>
          )
        }
      </div>
      <div className='w-full h-full p-2 flex flex-col gap-4'>
        {currentSection === 'My orders' && <UserOrderItem />}
        {currentSection === 'My shop' &&
          <>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
              <div className='flex flex-col md:flex-row gap-2 items-center md:items-start'>
                <div className='h-96 border border-black/40 min-w-0 max-w-[300px] w-full'>

                </div>
                <div className='flex flex-col w-full gap-2'>
                  <textarea placeholder='Name' {...register('name')} className='p-1 border border-black/40' />
                  <textarea placeholder='Description' {...register('description')} className='p-1 border border-black/40' />
                  <select {...register('category')}>
                    {
                      category.map((el) =>
                        <optgroup label={el.title} key={el.title}>
                          {
                            el.subCategory.map((subEl) =>
                              'subCategory' in subEl ?
                                subEl.subCategory?.map((item) =>
                                  <option key={item.title} value={item.title}>
                                    {item.title}
                                  </option>
                                )
                                :
                                <option key={subEl.title} value={subEl.title}>
                                  {subEl.title}
                                </option>
                            )
                          }
                        </optgroup>
                      )
                    }
                  </select>
                  <input placeholder='price' {...register('price')} className='p-1 border border-black/40' />
                  <input placeholder='discount' {...register('discount')} className='p-1 border border-black/40' />
                </div>
              </div>
              <button type='submit' className='bg-gray-500'>
                Submit
              </button>
            </form>
            <div className='w-full border-b border-black/40' />
            <div className='flex flex-col gap-2'>
              {product?.map((el, index) =>
                <div key={el.id}>
                  {index + 1} {el.category}
                </div>
              )}
            </div>
          </>
        }
      </div>
    </>
  )
}
