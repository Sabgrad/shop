import { deleteCloudinrayImage } from '@/action/deleteCloudinaryImage'
import { Image as ImagePrismaType } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { TiFolderDelete, TiFolderAdd } from 'react-icons/ti'
import noimage from '@/public/noimage.jpg'
import { CldUploadButton } from 'next-cloudinary'
import clsx from 'clsx'

type ImageComponentProps = {
  type: 'update' | 'view'
  images: ImagePrismaType[]
  productId: string
  isDisable?: boolean
  setIsDisable?: (value: boolean) => void
  triggerProductRequest?: () => void
}

export default function ImageComponent({
  type,
  images,
  productId,
  isDisable,
  setIsDisable,
  triggerProductRequest,
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

  const handleUpload = (result: any) => {
    if (setIsDisable) {
      setIsDisable(true)
      const { secure_url: path, public_id: publicId } = result.info
      axios.post('/api/image', {
        path,
        productId,
        publicId
      })
        .then(() => triggerProductRequest && triggerProductRequest())
        .catch(() => deleteCloudinrayImage(publicId))
        .finally(() => setIsDisable(false))
    }
  }

  const handleDeleteImage = (id: string, publicId: string) => {
    if (setIsDisable) {
      setIsDisable(true)
      axios.delete(`/api/image/${id}`)
        .then(() => {
          deleteCloudinrayImage(publicId)
            .then(() => { setCurrentImage(0), triggerProductRequest && triggerProductRequest() })
        })
        .finally(() => setIsDisable(false))
    }
  }

  return (
    <div className='flex gap-2 min-w-[15rem] max-w-[30rem]'>
      {
        images.length > 0 &&
        <div className='gap-2 flex flex-col'>
          {images.map((el) =>
            <div
              key={el.id}
              className={`h-[3.75rem] w-[3.75rem] flex justify-start bg-maincolor-950/40 items-center relative group`}
            >
              {
                type === 'update' &&
                <TiFolderDelete
                  className='hover:text-black text-black/40 absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-200/60 rounded-lg transition-all'
                  size={30}
                  onClick={() => handleDeleteImage(el.id, el.publicId)}
                />
              }
              <Image
                src={el.path}
                alt='image'
                width={60}
                height={60}
              />
            </div>
          )}
        </div>
      }
      <div className={`h-[324px] justify-center items-center relative flex bg-maincolor-950/40 group w-full`}>
        {
          images.length !== 0 &&
          <AiOutlineLeft
            className='opacity-0 group-hover:opacity-100 absolute left-1 bg-gray-100/10 hover:bg-gray-100/60 rounded-lg transition-all'
            size={40}
            onClick={() => handleSwapImage('left')}
          />
        }

        <Image
          src={images.length ? images[0].path : noimage}
          alt='product image'
          width={300}
          height={300}
        />
        {
          type === 'update' && images.length < 5 && isDisable === false &&
          <CldUploadButton
            onUpload={handleUpload}
            options={{ maxFiles: 1 }}
            uploadPreset='niudip3t'
            className='absolute'
          >
            <TiFolderAdd
              size={100}
              className='opacity-0 group-hover:opacity-100 bg-gray-100/10 hover:bg-gray-100/60 rounded-lg transition-all'
            />
          </CldUploadButton>
        }
        {
          images.length !== 0 &&
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