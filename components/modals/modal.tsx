'use client'

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
  // const [scrollOn, setScrollOn] = useState(false)

  // const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDomReady(true)
  }, [])

  useEffect(() => {

    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // const node = ref.current

    // if (node) {
    //   const resizeObserevr = new ResizeObserver(() => {
    //     console.log(node.clientHeight)
    //     console.log(window.innerHeight)

    //     if (node.clientHeight === window.innerHeight) {
    //       setScrollOn(true)
    //     }
    //   })

    //   resizeObserevr.observe(node)

    //   return () => resizeObserevr.disconnect()
    // }
  }, [active])

  return domReady && active ?
    ReactDOM.createPortal(
      <div
        className="fixed h-screen w-screen bg-black/40 flex justify-center items-center z-[900] top-0 left-0"
        onClick={() => setActive(false)}
      >
        <div
          className={clsx(`flex relative items-center p-10 bg-gray-50 h-full w-full flex-col gap-3 max-h-full overflow-auto
          sm:max-w-max sm:rounded-lg sm:h-max`)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body
    )
    : null
}