import React from 'react'

type ResponsiveGridLayoutProps = {
  children: React.ReactNode
}

export default function ResponsiveGridLayout({
  children
}: ResponsiveGridLayoutProps) {
  return (
    <div className='gap-2 grid responsive-grid w-full'>
      {children}
    </div>
  )
}
