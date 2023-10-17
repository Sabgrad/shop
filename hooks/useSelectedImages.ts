'use client'

import { useState } from "react"

export const useSelectedImages = () => {
  const [select, setSelect] = useState<string[]>([])

  const deleteFromSelected = (el: string) => {
    setSelect(prev => prev.filter((selectEl) => selectEl !== el))
  }

  const addToSelected = (el: string) => {
    setSelect(prev => [...prev, el])
  }

  const handleSelect = (el: string, isLoading: boolean) => {
    if (!isLoading) {
      let selectedItem = select.find((selectEl) => selectEl === el)
      selectedItem ? deleteFromSelected(el) : addToSelected(el)
    }
  }

  const clearSelect = () => {
    setSelect([])
  }

  return { select, handleSelect, clearSelect }
}