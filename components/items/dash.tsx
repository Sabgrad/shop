import clsx from 'clsx'
import React from 'react'

type DashProps = {
  type: 'x' | 'y'
}

export default function Dash({
  type
}: DashProps) {
  return (
    <div className={clsx('border-maincolor-950/20', type === 'x' && 'w-full h-0 border-b', type === 'y' && 'h-full w-0 border-r')} />
  )
}
