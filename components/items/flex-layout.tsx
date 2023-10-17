import React from 'react'

type FlexLayoutProps = {
  children: React.ReactNode
}

export default function FlexLayout({
  children
}: FlexLayoutProps) {
  return (
    <div className='flex flex-row gap-1 flex-wrap justify-center h-max'>
      {children}
    </div>
  )
}