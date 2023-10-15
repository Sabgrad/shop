export const initialStorageState = (storageName: string) => {
  let local = localStorage.getItem(storageName)
  if (local) return JSON.parse(local)
  if (!local) return null
}