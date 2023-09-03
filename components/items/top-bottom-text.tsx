import clsx from 'clsx'
import React from 'react'

type TopBottomTextProps = {
  top: string
  bottom: string
  className?: string
}

export default function TopBottomText({
  top,
  bottom,
  className
}: TopBottomTextProps) {

  return (
    <div className={clsx('flex flex-col justify-between', className && className)}>
      <span>
        {top}
      </span>
      <span>
        {bottom}
      </span>
    </div>
  )
}
