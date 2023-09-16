'use client'

import React, { createContext, useContext, useState } from 'react'
import { UserMenuData } from '@/lib/data'

type UserSectionType = typeof UserMenuData[number]['title'] | 'User'

type UserPageCurrentSectionType = {
  currentSection: UserSectionType
  setCurrentSection: React.Dispatch<React.SetStateAction<UserSectionType>>
}

const UserPageCurrentSection = createContext<UserPageCurrentSectionType | null>(null)

type UserPageCurrentSectionProps = {
  children: React.ReactNode
}

export default function UserPageCurrentSectionProvider({
  children
}: UserPageCurrentSectionProps) {

  const [currentSection, setCurrentSection] = useState<UserSectionType>('User')

  return (
    <UserPageCurrentSection.Provider
      value={{
        currentSection,
        setCurrentSection,
      }}
    >
      {children}
    </UserPageCurrentSection.Provider>
  )
}

export function useUserPageCurrentSection() {
  const context = useContext(UserPageCurrentSection)

  if (context === null) {
    throw new Error('useUserPageCurrentSection must be used within a UserPageCurrentSectionProvider')
  }

  return context
}