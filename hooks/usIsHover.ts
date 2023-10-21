'use client'

import { RefObject, useEffect, useState } from "react"

export const useIsHover = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>) => {

  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    const node = ref.current

    const handleMouseEnter = () => setIsHover(true)
    const handleMouseLeave = () => setIsHover(false)

    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter)
      node.addEventListener('mouseleave', handleMouseLeave)
    }
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.addEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])

  return isHover
}