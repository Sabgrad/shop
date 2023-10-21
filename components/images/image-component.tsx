'use client'

import Image from 'next/image'
import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import noimage from '@/public/noimage.jpg'
import { useImageSwitcher } from '@/hooks/useImageSwitcher'

type ImageComponentProps = {
  images: string[]
}

export default function ImageComponent({
  images,
}: ImageComponentProps) {

  const { currentImage, setCurrentImage, handleSwapImage } = useImageSwitcher(images.length)

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
      <div className={`h-[624px] justify-center items-center relative flex max-w-[37.50rem] group w-full`}>
        {
          images.length > 1 &&
          <AiOutlineLeft
            className='opacity-0 group-hover:opacity-100 absolute left-1 bg-gray-100/10 hover:bg-gray-100/60 rounded transition-all'
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
            className='opacity-0 group-hover:opacity-100 absolute right-1 bg-gray-100/10 hover:bg-gray-100/60 rounded transition-all'
            size={40}
            onClick={() => handleSwapImage('right')}
          />
        }
      </div>
    </div>
  )
}