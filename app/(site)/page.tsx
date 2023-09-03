import Image from "next/image"

import png from '@/public/png.png'

const arr = [1, 1, 1]

export default function Home() {

  return (
    <div className="h-full flex flex-col p-3 sm:p-6 lg:p-12 relative overflow-auto">
      <section className="gap-2 grid border border-black p-2 grid-cols-2 sm:grid-cols-3 lg:responsive-grid">
        {
          arr.map((el, index) =>
            <div key={index} className="flex flex-col p-2 border max-w-[20rem] border-black">
              <Image src={png} alt='card' />
              <span>
                name card
              </span>
              <span>
                price hr
              </span>
            </div>
          )
        }
      </section >
    </div >
  )
}