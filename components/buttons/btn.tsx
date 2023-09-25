'use client'

import clsx from "clsx"

type HeaderBtnProps = {
  children: React.ReactNode
  className?: string
  onClick?: (value?: string | boolean | number | React.MouseEvent<HTMLButtonElement> | any) => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

export default function Btn({
  children,
  className,
  onClick,
  disabled,
  type = 'button'
}: HeaderBtnProps) {

  return (
    <button onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx('p-1 gap-2 rounded-lg transition-all h-max flex items-center justify-center hover:bg-maincolor-300 hover:text-maincolor-950 whitespace-nowrap', className && className)}
    >
      {children}
    </button>
  )
}