'use client'

import React from 'react'
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

  const [domReady, setDomReady] = useState<boolean>(false)

  useEffect(() => {
    setDomReady(true)
  }, [])

  return domReady && active ?
    ReactDOM.createPortal(
      <div
        className="fixed h-screen w-screen bg-black/40 flex justify-center items-center z-[900] top-0 left-0"
        onClick={() => setActive(false)}
      >
        <div
          className="flex relative items-center p-10 bg-gray-50 h-full w-full flex-col gap-3
          sm:justify-center sm:max-w-max sm:rounded-lg sm:h-max"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body
    )
    : null
}