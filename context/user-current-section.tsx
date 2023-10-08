'use client'

import React, { createContext, useContext, useState } from 'react'
import { UserSectionType } from '@/types/types'

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

  const [currentSection, setCurrentSection] = useState<UserSectionType>('Me')

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

export function useUserPageCurrentSectionContext() {
  const context = useContext(UserPageCurrentSection)

  if (context === null) {
    throw new Error('useUserPageCurrentSection must be used within a UserPageCurrentSectionProvider')
  }

  return context
}