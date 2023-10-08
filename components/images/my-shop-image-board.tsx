import React, { Dispatch, SetStateAction, useState } from 'react'
import Btn from '../buttons/btn'
import ImageUpload from './image-upload'

type MyShopImageBoardProps = {
  id: string
  images: string[] | undefined
  setTriggerImages: Dispatch<SetStateAction<number>>
}

export default function MyShopImageBoard({
  id,
  images,
  setTriggerImages,
}: MyShopImageBoardProps) {

  const [imageBoard, setImageBoard] = useState(false)

  console.log(images)

  return (
    <>
      <Btn className='bg-maincolor-100' onClick={() => setImageBoard(true)}>
        Open image board
      </Btn>
      {
        imageBoard &&
        <div
          className='flex flex-col fixed top-0 left-0 w-screen h-screen z-[951] bg-white p-2 gap-2'
        >
          <Btn className='bg-maincolor-100' onClick={() => setImageBoard(false)}>
            Close
          </Btn>
          {images && <ImageUpload id={id} images={images} setTriggerImages={setTriggerImages} />}
        </div>
      }
    </>
  )
}
