'use client'

import clsx from 'clsx'
import React, { useState } from 'react'

export default function ReviewTextWrapper({
  children
}: { children: string }) {

  const [open, setOpen] = useState(false)

  return (
    <span className={clsx(open ? '' : 'line-clamp-4')} onClick={() => setOpen(prev => !prev)}>
      {children}
    </span>
  )
}