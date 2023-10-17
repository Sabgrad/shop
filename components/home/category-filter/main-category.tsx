import { Main } from "@/types/types"
import { useState } from "react"
import Group from "./group"

export default function MainCategory({ main }: { main: Main }) {

  const [open, set] = useState(false)

  return (
    <div className='flex flex-col'>
      <span
        onClick={() => set(prev => !prev)}
        className="font-normal"
      >
        {main.title}
      </span>
      {
        open &&
        main.groups.map(group =>
          <Group key={group.title} group={group} />
        )
      }
    </div>
  )
}