import Image from 'next/image'
import React, { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import noimage from '@/public/noimage.jpg'


type ImageComponentProps = {
  images: string[]
}

export default function ImageComponent({
  images,
}: ImageComponentProps) {

  const [currentImage, setCurrentImage] = useState(0)

  const handleSwapImage = (type: 'left' | 'right') => {
    if (type === 'left') {
      if (currentImage === 0) {
        setCurrentImage(images.length - 1)
      }
      if (currentImage !== 0) {
        setCurrentImage(prev => prev - 1)
      }
    }
    if (type === 'right') {
      if (currentImage === images.length - 1) {
        setCurrentImage(0)
      }
      if (currentImage < images.length - 1) {
        setCurrentImage(prev => prev + 1)
      }
    }
  }

  return (
    <div className='flex gap-2 min-w-[15rem] max-w-[40rem]'>
      {
        images.length > 1 &&
        <div className='gap-4 flex flex-col'>
          {images.map((el, index) =>
            <div
              key={el}
              className={`h-[4rem] w-[4rem] flex justify-start bg-maincolor-950/10 items-center relative group`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={el}
                alt='image'
                width={64}
                height={64}
              />
            </div>
          )}
        </div>
      }
      <div className={`h-[624px] justify-center items-center relative flex max-w-[37.50rem] group w-full bg-white`}>
        {
          images.length > 1 &&
          <AiOutlineLeft
            className='opacity-0 group-hover:opacity-100 absolute left-1 bg-gray-100/10 hover:bg-gray-100/60 rounded-lg transition-all'
            size={40}
            onClick={() => handleSwapImage('left')}
          />
        }
        <Image
          src={images.length ? images[currentImage] : noimage}
          alt='product image'
          width={600}
          height={600}
        />
        {
          images.length > 1 &&
          <AiOutlineRight
            className='opacity-0 group-hover:opacity-100 absolute right-1 bg-gray-100/10 hover:bg-gray-100/60 rounded-lg transition-all'
            size={40}
            onClick={() => handleSwapImage('right')}
          />
        }
      </div>
    </div>
  )
}