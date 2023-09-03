import clsx from 'clsx'
import React from 'react'

type MenuBtnProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function MenuBtn({
  children,
  onClick,
  className
}: MenuBtnProps) {

  return (
    <button className={clsx('w-full flex justify-start p-2 rounded-lg hover:bg-green-500/20 transition-all items-center flex-row gap-1', className && className)} onClick={onClick}>
      {children}
    </button>
  )
}