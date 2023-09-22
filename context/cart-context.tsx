'use client'

import { ProductType, userCartType } from '@/types/types'
import React, { createContext, useContext, useEffect, useState } from 'react'


type CartContextType = {
  userCart: userCartType[]
  setUserCart: React.Dispatch<React.SetStateAction<userCartType[]>>
}

const CartContext = createContext<CartContextType | null>(null)

type CartContextProps = {
  children: React.ReactNode
}

export default function CartContextProvider({
  children
}: CartContextProps) {

  const [userCart, setUserCart] = useState<userCartType[]>([])

  useEffect(() => {
    const localUserCart = localStorage.getItem('user-cart')
    if (localUserCart) {
      setUserCart(JSON.parse(localUserCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('user-cart', JSON.stringify(userCart))
  }, [userCart])

  return (
    <CartContext.Provider
      value={{
        userCart,
        setUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


export function useCartContext() {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCartContext must be used within a CartContextProvider')
  }

  return context
}