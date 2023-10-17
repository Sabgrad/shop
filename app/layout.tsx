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
        <body className={clsx('bg-gray-50 dark:bg-black h-full relative pt-[3.375rem] font-light dark:text-gray-50',
          inter.className,
        )}>
          <Header />
          {children}
          <Menu />
          <Catalog />
          <Toaster position='top-center' toastOptions={{ className: 'bg-white text-black border border-maincolor-950/30 dark:bg-black dark:text-white border-maincolor-50/30' }} />
        </body>
      </Providers>
    </html >
  )
}