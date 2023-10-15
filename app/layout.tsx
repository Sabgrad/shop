import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import Header from '@/components/header/header'
import { Toaster } from 'react-hot-toast'
import Menu from '@/components/menu/menu'
import Catalog from '@/components/catalog'
import Providers from '@/context/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop on Next.js, TanStack, Prisma, MongoDB, Tailwind and Vercel deploy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full select-none relative'>
      <Providers>
        <body className={clsx('bg-maincolor-50 h-full relative pt-[4.5rem]',
          inter.className,
        )}>
          <Header />
          {children}
          <Menu />
          <Catalog />
          <Toaster position='top-center' />
        </body>
      </Providers>
    </html >
  )
}