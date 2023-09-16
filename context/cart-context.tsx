'use client'

import { ProductType } from '@/types/types'
import React, { createContext, useContext, useEffect, useState } from 'react'

type CartContextType = {
  userCart: ProductType[]
  setUserCart: React.Dispatch<React.SetStateAction<ProductType[]>>
}

const CartContext = createContext<CartContextType | null>(null)

type CartContextProps = {
  children: React.ReactNode
}

export default function CartContextProvider({
  children
}: CartContextProps) {

  const [userCart, setUserCart] = useState<ProductType[]>([])

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