import { useMemo } from "react"

export const useIsLoading = (Array: boolean[]): { isLoading: boolean } => {

  const isLoading = useMemo(() => {
    let load = Array.find(el => el === true)
    if (load) {
      return true
    } else {
      return false
    }
  }, Array)

  return { isLoading }
}