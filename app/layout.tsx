import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import { Toaster } from 'react-hot-toast'
import AuthContext from '@/context/session-context'
import MenuContextProvider from '@/context/menu-context'
import Menu from '@/components/menu'
import CatalogContextProvider from '@/context/catalog-context'
import Catalog from '@/components/catalog'
import UserContextProvider from '@/context/user-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop on Next.js, Mongodb, Tailwind and Vercel deploy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full select-none'>
      <AuthContext>
        <UserContextProvider>
          <MenuContextProvider>
            <CatalogContextProvider>
              <body className={clsx(inter.className,
                'bg-gray-50 h-full relative pt-[4.5rem]'
              )}>
                <Header />
                {children}
                <Menu />
                <Catalog />
                <Toaster position='top-center' />
              </body>
            </CatalogContextProvider>
          </MenuContextProvider>
        </UserContextProvider>
      </AuthContext>
    </html>
  )
}