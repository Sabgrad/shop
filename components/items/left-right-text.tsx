import clsx from 'clsx'
import React from 'react'

type LeftRightProps = {
  right: string
  left: string
  className?: string
}

export default function LeftRightText({
  right,
  left,
  className
}: LeftRightProps) {

  return (
    <div className={clsx('flex flex-row justify-between', className && className)}>
      <span>
        {right}
      </span>
      <span>
        {left}
      </span>
    </div>
  )
}