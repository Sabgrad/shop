'use client'

import { ProductType } from '@/types/types'
import { User } from '@prisma/client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

type UserContexProps = {
  children: React.ReactNode
}

type UserContextType = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  triggerProduct: number
  triggerProductRequest: () => void
}

const UserContext = createContext<UserContextType | null>(null)

const getUser = async (email: string) => {
  let res = await axios.get(`/api/user/${email}`)

  if (res.data) {
    return res.data
  }
}

export default function UserContextProvider({
  children
}: UserContexProps) {

  const [user, setUser] = useState<User>()
  const [triggerProduct, setTriggerProduct] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const triggerProductRequest = () => {
    setTriggerProduct(v => v + 1)
  }

  const session = useSession()

  useEffect(() => {
    if (session.status === 'authenticated') {
      getUser(session.data.user?.email as string)
        .then((res) => {
          setUser(res),
            setTriggerProduct(v => v + 1)
        })
    }
  }, [session.data?.user?.email])


  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLoading,
      setIsLoading,
      triggerProduct,
      triggerProductRequest
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)

  if (context === null) {
    throw new Error('useMenuContext must be used within a MenuContextProvider')
  }

  return context
}