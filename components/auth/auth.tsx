'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Btn from '../buttons/btn'
import { AiOutlineCloseCircle, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import Modal from '../modals/modal'
import { useMutation } from '@tanstack/react-query'
import ShopService from '@/services/services'
import { useRegisterUser } from '@/hooks/tanstack-query/useMutation-hooks'

type AuthProps = {

}

type Variant = 'login' | 'register'

export default function Auth({

}: AuthProps) {

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

  const { mutate: auth } = useRegisterUser({ reset })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === 'login') {
      signIn('credentials', data)
        .then((callback) => {
          if (callback?.error) {
            toast.error('invalid cred')
          }
          if (callback?.ok && !callback?.error) {
            toast.success('Success sign in')
          }
        })
    }
    if (variant === 'register') {
      auth(data)
    }
  }

  return (
    <>
      <Btn className='hidden text-maincolor-100 sm:flex' onClick={() => {
        session.status === 'authenticated' ? router.push('/user') : setActiveAuth(true)
      }}>
        {
          session.status === 'authenticated' ?
            <AiOutlineUser size={28} />
            :
            <AiOutlineUserAdd size={28} />
        }
      </Btn>

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