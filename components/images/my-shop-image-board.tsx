import React, { Dispatch, SetStateAction, useState } from 'react'
import Btn from '../buttons/btn'
import ImageUpload from './image-upload'

type MyShopImageBoardProps = {
  id: string
  images: string[] | undefined
}

export default function MyShopImageBoard({
  id,
  images,
}: MyShopImageBoardProps) {

  const [imageBoard, setImageBoard] = useState(false)

  return (
    <>
      <Btn onClick={() => setImageBoard(true)}>
        Open image board
      </Btn>
      {
        imageBoard &&
        <div
          className='flex flex-col fixed top-0 left-0 w-screen h-screen z-[951] bg-white p-2 gap-2'
        >
          {images && <ImageUpload id={id} images={images} setImageBoard={setImageBoard} />}
        </div>
      }
    </>
  )
}
