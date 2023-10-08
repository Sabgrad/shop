'use client'

import React, { createContext, useContext, useState } from 'react'

type HomePageCurrentCategoryType = {
  currentCategory: string
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>
}

const HomePageCurrentCategory = createContext<HomePageCurrentCategoryType | null>(null)

type HomePageCurrentCategorProps = {
  children: React.ReactNode
}

export default function HomePageCurrentCategoryProvider({
  children
}: HomePageCurrentCategorProps) {

  const [currentCategory, setCurrentCategory] = useState<string>('')

  return (
    <HomePageCurrentCategory.Provider
      value={{
        currentCategory,
        setCurrentCategory,
      }}
    >
      {children}
    </HomePageCurrentCategory.Provider>
  )
}

export function useHomePageCurrentCategoryContext() {
  const context = useContext(HomePageCurrentCategory)

  if (context === null) {
    throw new Error('useHomePageCurrentCategory must be used within a HomePageCurrentCategoryProvider')
  }

  return context
}