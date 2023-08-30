import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import Header from '@/components/header/header'
import Footer from '@/components/footer'

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
    <html lang="en" className='h-full'>
      <body className={clsx(inter.className, 
        'bg-gray-50 h-full relative pt-[4.5rem]'
        )}>
          <Header />
          {children}
          <Footer />
        </body>
    </html>
  )
}