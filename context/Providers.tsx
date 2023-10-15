'use client'

import React from 'react'
import AuthContext from './session-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({
  children
}: { children: React.ReactNode }) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 5,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        {children}
      </AuthContext >
    </QueryClientProvider>
  )
}