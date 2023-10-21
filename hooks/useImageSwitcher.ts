import { useState } from "react"

export const useImageSwitcher = (length: number, init?: number) => {
  const [currentImage, setCurrentImage] = useState(init || 0)

  const handleSwapImage = (type: 'left' | 'right') => {
    if (type === 'left') {
      if (currentImage === 0) {
        setCurrentImage(length - 1)
      }
      if (currentImage !== 0) {
        setCurrentImage(prev => prev - 1)
      }
    }
    if (type === 'right') {
      if (currentImage === length - 1) {
        setCurrentImage(0)
      }
      if (currentImage < length - 1) {
        setCurrentImage(prev => prev + 1)
      }
    }
  }

  return { currentImage, setCurrentImage, handleSwapImage }
}