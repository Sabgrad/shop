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
  type = 'button',
}: HeaderBtnProps) {

  return (
    <button onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        'p-1 gap-2 rounded transition-all relative h-max flex items-center justify-center whitespace-nowrap border',
        'bg-white border-maincolor-950/30 hover:bg-maincolor-50 dark:bg-black dark:border-maincolor-50/30 dark:hover:bg-maincolor-50/30',
        className && className,
        disabled && 'blur-[2px] pointer-events-none',
        ''
      )}
    >
      {children}
    </button>
  )
}