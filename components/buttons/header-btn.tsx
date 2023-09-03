'use client'

import clsx from "clsx"

type HeaderBtnProps = {
  children: React.ReactNode
  className?: string
  onClick?: (value?: string | boolean | number) => void
}

export default function HeaderBtn({
  children,
  className,
  onClick
}: HeaderBtnProps) {

  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <button onClick={handleClick}
      className={clsx('p-2 hover:bg-gray-500 rounded-lg transition-all h-max flex items-center justify-center text-gray-200', className && className)}
    >
      {children}
    </button>
  )
}