import React, { Dispatch, SetStateAction, useState } from 'react'
import Btn from '../buttons/btn'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import clsx from 'clsx'
import { ImSpinner8 } from 'react-icons/im'
import ShopService from '@/services/services'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { extractPublicId } from 'cloudinary-build-url'
import { useDeleteCloudinaryImages, useDeleteUserImages, useUpdateUserImages } from '@/hooks/tanstack-query/useMutation-hooks'

type ImageUploadProps = {
  id: string
  images: string[]
  setTriggerImages: Dispatch<SetStateAction<number>>
}

export default function ImageUpload({
  id,
  images,
  setTriggerImages
}: ImageUploadProps) {

  const [select, setSelect] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: updateImages } = useUpdateUserImages({ id, images, setTriggerImages })

  const { mutate: deleteCloudinaryImages } = useDeleteCloudinaryImages()

  const { mutate: deleteImages } = useDeleteUserImages({ select, deleteCloudinaryImages })

  const onUpload = (result: any) => {
    if (result) {
      updateImages(result.info.secure_url)
    }
  }

  const handleDeleteImages = () => {
    const toDeleteImages = new Set(select)
    const updateImages = images.filter((el) => !toDeleteImages.has(el))
    deleteImages({ id, images: updateImages })
  }

  return (
    <>
      <div className='flex flex-row gap-2 w-full border-y-2 border-maincolor-950 py-2 sticky'>
        <CldUploadWidget uploadPreset='niudip3t' onUpload={onUpload} options={{ maxFiles: 1, maxImageWidth: 1920, maxImageHeight: 1080, maxFileSize: 10000000 }}>
          {({ open }: any) => {
            const click = (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              open()
            }
            return (
              <>
                {
                  images.length >= 256 ?
                    <span>You uplaod maximum images</span>
                    :
                    <Btn className='bg-maincolor-100' onClick={click}>
                      Add image
                    </Btn>
                }
              </>
            )
          }}
        </CldUploadWidget>
        <Btn
          className='bg-maincolor-100 hover:!bg-maincolor-500 hover:text-white ml-auto'
          onClick={handleDeleteImages}
          disabled={select.length === 0}
        >
          Delete
        </Btn>
      </div>
      {
        <div className='flex gap-4 justify-evenly flex-wrap pb-4 overflow-y-auto'>
          {images.length ?
            images?.map((el) =>
              <div
                onClick={() => select.find((selectEl) => selectEl === el) ? setSelect(prev => prev.filter((selectEl) => selectEl !== el)) : setSelect(prev => [...prev, el])}
                key={el}
                className={
                  clsx(`h-[15rem] w-[15rem] flex justify-center items-center border-2 border-maincolor-100/0 relative p-1 rounded-lg transition-all`,
                    select.find(selectEl => selectEl === el) && '!border-maincolor-100')
                }
              >
                <Image src={el} alt='user_galery_images' className='object-contain' width={240} height={240} />
              </div>
            )
            :
            'Image not found'
          }
        </div>
      }
      {
        isLoading &&
        <div className='bg-maincolor-50/80 fixed w-screen h-screen z-[960] -ml-2 -mt-2 flex justify-center items-center'>
          <ImSpinner8 size={64} className='animate-spin' />
        </div>
      }
    </>
  )
}