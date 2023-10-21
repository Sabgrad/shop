import { useEffect } from "react"


export const useTurnOffBodyScroll = (off: boolean) => {
  useEffect(() => {
    if (off) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [off])
}