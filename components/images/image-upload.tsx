import React from 'react'
import Btn from '../buttons/btn'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import clsx from 'clsx'
import { useDeleteCloudinaryImages, useDeleteUserImages, useUpdateUserImages } from '@/hooks/tanstack-query/useMutation-hooks'
import FlexLayout from '../items/flex-layout'
import { useSelectedImages } from '@/hooks/useSelectedImages'
import { useIsLoading } from '@/hooks/useIsLoading'

type ImageUploadProps = {
  id: string
  images: string[]
  setImageBoard: (v: false) => void
}

export default function ImageUpload({
  id,
  images,
  setImageBoard
}: ImageUploadProps) {

  const { select, handleSelect, clearSelect } = useSelectedImages()

  const { mutate: updateImages, isLoading: isLoadingUpdateImages } = useUpdateUserImages({ id, images })
  const { mutate: deleteCloudinaryImages, isLoading: isLoadingCloudinaryImages } = useDeleteCloudinaryImages({ clearSelect })
  const { mutate: deleteImages, isLoading: isLoadingDBImages } = useDeleteUserImages({ select, deleteCloudinaryImages })

  const { isLoading } = useIsLoading([isLoadingCloudinaryImages, isLoadingDBImages, isLoadingUpdateImages])

  const onUpload = (result: any) => {
    if (result) {
      updateImages(result.info.secure_url)
    }
  }

  const handleDeleteImages = () => {
    if (!isLoading) {
      let toDeleteImages = new Set(select)
      let keepedImages = images.filter((el) => !toDeleteImages.has(el))
      deleteImages({ id, images: keepedImages })
    }
  }

  return (
    <>
      <div className='flex flex-row gap-2 w-full border-b border-maincolor-950 py-2 sticky'>
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
                    <Btn disabled={isLoading} className='bg-maincolor-100' onClick={click}>
                      Add image
                    </Btn>
                }
              </>
            )
          }}
        </CldUploadWidget>
        <Btn
          className='ml-auto'
          onClick={handleDeleteImages}
          disabled={select.length === 0 || isLoading}
        >
          Delete
        </Btn>
        <Btn onClick={() => setImageBoard(false)}>
          Close
        </Btn>
      </div>
      {
        <FlexLayout>
          {images.length ?
            images?.map((el) =>
              <div
                onClick={() => handleSelect(el, isLoading)}
                key={el}
                className={
                  clsx(`h-[15rem] w-[15rem] flex justify-center items-center border-2 border-maincolor-100/0 relative p-1 rounded transition-all`,
                    select.find(selectEl => selectEl === el) && '!border-maincolor-100')
                }
              >
                <Image src={el} alt='user_galery_images' className='object-contain' width={240} height={240} />
              </div>
            )
            :
            'Image not found'
          }
        </FlexLayout>
      }
    </>
  )
}