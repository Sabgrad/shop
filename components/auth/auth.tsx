'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Btn from '../buttons/btn'
import { AiOutlineCloseCircle, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import Modal from '../modals/modal'
import { useRegisterUser } from '@/hooks/tanstack-query/useMutation-hooks'
import Input from '../input/input'

type Variant = 'login' | 'register'

export default function Auth() {

  const router = useRouter()

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
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials')
          }
          if (callback?.ok && !callback?.error) {
            toast.success('Success sign in')
            setActiveAuth(false)
          }
        })
    }
    if (variant === 'register') {
      auth(data)
      setActiveAuth(false)
    }
  }

  return (
    <>
      <Btn className='hidden sm:flex' onClick={() => {
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
        <Btn className='!absolute top-1 right-1 rounded-full sm:hidden
          '
          onClick={() => setActiveAuth(false)}
        >
          <AiOutlineCloseCircle size={24} />
        </Btn>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-full sm:w-[35rem] items-center'>
          {variant === 'register' &&
            <Input id='name' placeholder='Name' required register={register} className='w-full' />
          }
          <Input id='email' type='email' placeholder='Email' register={register} required className='w-full' />
          <Input id='password' type='password' placeholder='Password' register={register} required className='w-full' />
          <Btn type='submit' disabled={session.status === 'loading'}>
            {session.status === 'loading' ? <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-maincolor-950/30 dark:border-maincolor-50/30' /> : 'Submit'}
          </Btn>
          <div className='flex flex-row gap-2 text-sm border-t border-maincolor-950/30 dark:border-maincolor-50/30 w-full pt-5 mt-5 justify-center'>
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