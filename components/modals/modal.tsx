'use client'

import { useTurnOffBodyScroll } from '@/hooks/useTurnOffBodyScroll'
import clsx from 'clsx'
import React, { useRef } from 'react'
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

type ModalProps = {
  children: React.ReactNode
  active: boolean
  setActive: (active: boolean) => void
}

export default function Modal({
  children,
  active,
  setActive,
}: ModalProps) {

  const [domReady, setDomReady] = useState(false)

  useEffect(() => {
    setDomReady(true)
  }, [])

  useTurnOffBodyScroll(active)

  return domReady && active ?
    ReactDOM.createPortal(
      <div
        className="fixed h-screen w-screen bg-maincolor-950/50 flex justify-center items-center z-[950] top-0 left-0"
        onClick={() => setActive(false)}
      >
        <div
          className={clsx(`flex relative items-center p-10 h-full w-full flex-col gap-3 max-h-full overflow-auto
          sm:max-w-max sm:rounded sm:h-max sm:border
          border-maincolor-950/30 dark:border-maincolor-50/30 bg-white dark:bg-black
          `)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body
    )
    : null
}