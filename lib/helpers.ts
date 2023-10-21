import toast from "react-hot-toast"

export const copyTextToClipBoard = (id: string) => {
  let element = document.getElementById(id)

  if (element) {
    navigator.clipboard.writeText(element.textContent!)
      .then(() => toast.success(`${id} was copied`))
      .catch((err) => toast.error(`Something went wrong ${err}`))
  }
}