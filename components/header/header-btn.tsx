import clsx from 'clsx'
import React from 'react'

type HeaderBtnProps = {
  children: React.ReactNode
  className?: string
}

export default function HeaderBtn({
  children,
  className
}: HeaderBtnProps) {
  return (
    <button className={clsx('p-2 hover:bg-gray-500 rounded-lg transition-all h-full flex items-center justify-center', className && className)}>
      {children}
    </button>
  )
}