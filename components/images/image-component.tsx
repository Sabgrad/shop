import { deleteCloudinrayImage } from '@/action/deleteCloudinaryImage'
import { Image as ImagePrismaType } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { TiFolderDelete, TiFolderAdd } from 'react-icons/ti'
import noimage from '@/public/noimage.jpg'
import { CldUploadButton } from 'next-cloudinary'

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
              className='flex w-20 h-20 justify-start items-center relative 
            bg-gray-200 rounded-lg group'
            >
              {
                type === 'update' &&
                <TiFolderDelete
                  className='hover:text-black text-black/40 absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-200/60 rounded-lg transition-all'
                  size={40}
                  onClick={() => handleDeleteImage(el.id, el.publicId)}
                />
              }
              <Image
                src={el.path}
                alt='image'
                width={80}
                height={80}
              />
            </div>
          )}
        </div>
      }
      <div className='h-[432px] justify-center items-center relative flex bg-gray-200 rounded-lg group w-full'>
        {
          images.length !== 0 &&
          <AiOutlineLeft
            className='opacity-0 group-hover:opacity-100 absolute left-1 bg-gray-100/10 hover:bg-gray-100/60 rounded-lg transition-all'
            size={40}
            onClick={() => handleSwapImage('left')}
          />
        }
        {
          images.length ?
            <Image
              src={images.at(currentImage)?.path as string}
              alt='product image'
              width={432}
              height={432}
            />
            :
            <Image
              src={noimage}
              alt='product image'
              width={234}
              height={234}
            />
        }
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