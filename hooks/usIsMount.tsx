import { useEffect, useState } from "react"

export const useIsMount = (): { isMount: boolean } => {
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  return { isMount }
}