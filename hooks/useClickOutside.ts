'use client'

import { RefObject, useEffect } from "react"

export const useClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: () => void) => {

  useEffect(() => {
    const node = ref.current

    const handleClickOutside = (e: MouseEvent) => {
      if (node && !node.contains(e.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, callback])
}