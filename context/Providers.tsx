'use client'

import React from 'react'
import AuthContext from './session-context'
import CartContextProvider from './cart-context'
import UserContextProvider from './user-context'
import CatalogContextProvider from './catalog-context'
import UserPageCurrentSectionProvider from './user-current-section'
import MenuContextProvider from './menu-context'
import HomePageCurrentCategoryProvider from './home-current-category'
import WishListContextProvider from './wish-list-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({
  children
}: { children: React.ReactNode }) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <CartContextProvider>
          <UserContextProvider>
            <CatalogContextProvider>
              <UserPageCurrentSectionProvider>
                <MenuContextProvider>
                  <HomePageCurrentCategoryProvider>
                    <WishListContextProvider>
                      {children}
                    </WishListContextProvider>
                  </HomePageCurrentCategoryProvider>
                </MenuContextProvider>
              </UserPageCurrentSectionProvider>
            </CatalogContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      </AuthContext >
    </QueryClientProvider>
  )
}