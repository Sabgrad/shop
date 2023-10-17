'use client'

import { RefObject, useEffect } from "react"

export const useIsHover = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: () => void) => {

  useEffect(() => {
    const node = ref.current

    const handleMouseOver = (e: MouseEvent) => {
      if (node && !node.contains(e.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [ref, callback])
}