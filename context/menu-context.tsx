'use client'

import React, { createContext, useContext, useState } from 'react'


const MenuContext = createContext<MenuContextType | null>(null)

type MenuContextProps = {
  children: React.ReactNode
}

type MenuContextType = {
  activeMenu: boolean
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenuContextProvider({
  children
}: MenuContextProps) {

  const [activeMenu, setActiveMenu] = useState(false)

  return (
    <MenuContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}


export function useMenuContext() {
  const context = useContext(MenuContext)

  if (context === null) {
    throw new Error('useMenuContext must be used within a MenuContextProvider')
  }

  return context
}