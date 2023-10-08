'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type WishListContextType = {
  userWishList: { productId: string }[]
  setUserWishList: React.Dispatch<React.SetStateAction<{ productId: string }[]>>
}

const WishListContext = createContext<WishListContextType | null>(null)

type CartContextProps = {
  children: React.ReactNode
}

export default function WishListContextProvider({
  children
}: CartContextProps) {

  const [userWishList, setUserWishList] = useState<{ productId: string }[]>([])

  useEffect(() => {
    const localUserCart = localStorage.getItem('user-whish-list')
    if (localUserCart) {
      setUserWishList(JSON.parse(localUserCart))
    }

    const storage = () => {
      let localStor = localStorage.getItem('user-whish-list')
      let stor: { productId: string }[] = localStor !== null ? JSON.parse(localStor) : null
      if (stor) {
        setUserWishList(stor)
      }
    }

    window.addEventListener('storage', storage)
    return () => window.removeEventListener('storage', storage)
  }, [])

  useEffect(() => {
    localStorage.setItem('user-whish-list', JSON.stringify(userWishList))
  }, [userWishList])

  return (
    <WishListContext.Provider
      value={{
        userWishList,
        setUserWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  )
}


export function useWishListContext() {
  const context = useContext(WishListContext)

  if (context === null) {
    throw new Error('useWishListContext must be used within a WishListContext')
  }

  return context
}