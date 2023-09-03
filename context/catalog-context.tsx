'use client'

import React, { createContext, useContext, useState } from 'react'


const CatalogContext = createContext<CatalogContextType | null>(null)

type CatalogContextProps = {
  children: React.ReactNode
}

type CatalogContextType = {
  activeCatalog: boolean
  setActiveCatalog: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CatalogContextProvider({
  children
}: CatalogContextProps) {

  const [activeCatalog, setActiveCatalog] = useState(false)

  return (
    <CatalogContext.Provider
      value={{
        activeCatalog,
        setActiveCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  )
}


export function useCatalogContext() {
  const context = useContext(CatalogContext)

  if (context === null) {
    throw new Error('useCatalogContext must be used within a CatalogContextProvider')
  }

  return context
}