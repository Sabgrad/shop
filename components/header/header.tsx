'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineMenu, AiFillShop, AiOutlineUser, AiOutlineAppstore, AiOutlineShoppingCart, AiOutlineSearch, AiFillSetting, AiOutlineUserAdd, AiOutlineCloseCircle } from 'react-icons/ai'
import Modal from '../modals/modal'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast'
import { useMenuContext } from '@/context/menu-context'
import { useCatalogContext } from '@/context/catalog-context'
import HeaderBtn from '../buttons/header-btn'

export default function Header() {
  return (
    <header className="h-[4.5rem] z-[800] fixed top-0  bg-black/90 w-full px-1 sm:px-6 text-xl text-white">

      <div className='w-full h-full flex flex-row gap-2 justify-center items-center py-4'>
        <MenuToggle />
        <Link href='/' className='flex justify-center items-center gap-2 text-gray-200'>
          <AiFillShop size={28} /> <span className='text-3xl font-semibold hidden xl:block'>SHOP</span>
        </Link>
        <CatalogToggle />
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
          <AiFillSetting size={28} />
        </HeaderBtn>
        <Register />
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


type RegisterProps = {

}

type Variant = 'login' | 'register'

function Register({

}: RegisterProps) {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [variant, setVariant] = useState<Variant>('login')
  const [activeAuth, setActiveAuth] = useState(false)

  const session = useSession()

  const {
    handleSubmit,
    register,
    reset,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    setIsLoading(true)
    if (variant === 'login') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('invalid cred')
          }

          if (callback?.ok && !callback?.error) {
            toast.success('succes sign in')
          }
        })
        .finally(() => setIsLoading(false))
    }
    if (variant === 'register') {
      axios.post('/api/register', data)
        .then(() => { signIn('credentials', data), toast.success('Now your have an account'), reset() })
        .catch(() => toast.error('something went wrong'))
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <>
      <HeaderBtn className='hidden sm:flex' onClick={() => {
        session.status === 'authenticated' ? router.push('/user') : setActiveAuth(true)
      }}>
        {
          session.status === 'authenticated' ?
            <AiOutlineUser size={28} />
            :
            <AiOutlineUserAdd size={28} />
        }
      </HeaderBtn>

      <Modal active={activeAuth} setActive={setActiveAuth}>
        <div className='absolute top-1 right-1 p-1 rounded-full transition-all block
          hover:bg-gray-300 sm:hidden
          '
          onClick={() => setActiveAuth(false)}
        >
          <AiOutlineCloseCircle size={24} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-full sm:w-[35rem] items-center text-xl'>
          {variant === 'register' &&
            <input
              id='name'
              type='text'
              placeholder='Name'
              className='w-full px-4 py-1'
              {...register('name')}
            />
          }
          <input
            id='email'
            type='email'
            placeholder='Email'
            {...register('email')}
            className='w-full px-4 py-1'
          />
          <input
            id='email'
            type='password'
            placeholder='Password'
            {...register('password')}
            className='w-full px-4 py-1'
          />
          <button type='submit' className=' bg-gray-500 hover:bg-gray-700 text-white px-4 py-1 transition-all rounded-lg' disabled={isLoading}>
            {isLoading ? <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-white' /> : 'Submit'}
          </button>
          <div className='border-t border-black/50 w-full' />
          <div className='flex flex-row gap-2 text-sm'>
            <span>
              {variant === 'login' ? "New to Shop?" : "Already have an account?"}
            </span>
            <span className='underline' onClick={() => setVariant(prev => prev === 'login' ? 'register' : 'login')}>
              {variant === 'login' ? "Create an Account" : "Login"}
            </span>
          </div>
        </form>

      </Modal>
    </>
  )
}

function MenuToggle() {

  const { setActiveMenu } = useMenuContext()

  return (
    <>
      <HeaderBtn onClick={() => setActiveMenu(true)}>
        <AiOutlineMenu size={28} />
      </HeaderBtn>
    </>
  )
}

function CatalogToggle() {

  const { setActiveCatalog } = useCatalogContext()

  return (
    <HeaderBtn className='gap-2 bg-gray-700 hidden lg:flex' onClick={() => setActiveCatalog(true)}>
      <AiOutlineAppstore size={28} /> Catalog
    </HeaderBtn>
  )
}