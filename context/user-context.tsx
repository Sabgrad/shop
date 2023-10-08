'use client'

import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import ShopService from '@/services/services'
import { useQuery } from '@tanstack/react-query'
import { useFetchUser } from '@/hooks/tanstack-query/useQuery-hooks'

type UserContexProps = {
  children: React.ReactNode
}

type UserContextType = {
  user: User | undefined
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  triggerProduct: number
  triggerProductRequest: () => void
}

const UserContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({
  children
}: UserContexProps) {

  const [triggerProduct, setTriggerProduct] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const triggerProductRequest = () => {
    setTriggerProduct(v => v + 1)
  }

  const session = useSession()

  const { data: user } = useFetchUser({ email: session.data?.user?.email, setTriggerProduct })

  return (
    <UserContext.Provider value={{
      user,
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
    throw new Error('useUserContext must be used within a MenuContextProvider')
  }

  return context
}