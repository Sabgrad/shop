import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import Btn from '../buttons/btn'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import clsx from 'clsx'
import { ImSpinner8 } from 'react-icons/im'
import { useDeleteCloudinaryImages, useDeleteUserImages, useUpdateUserImages } from '@/hooks/tanstack-query/useMutation-hooks'
import FlexLayout from '../items/flex-layout'
import { useQueryClient } from '@tanstack/react-query'

type ImageUploadProps = {
  id: string
  images: string[]
}

export default function ImageUpload({
  id,
  images,
}: ImageUploadProps) {

  const [select, setSelect] = useState<string[]>([])

  const client = useQueryClient()

  const { mutate: updateImages, isLoading: isLoadingUpdateImages } = useUpdateUserImages({ id, images })

  const { mutate: deleteCloudinaryImages, isLoading: isLoadingCloudinaryImages } = useDeleteCloudinaryImages({ setSelect })

  const { mutate: deleteImages, isLoading: isLoadingDBImages } = useDeleteUserImages({ select, deleteCloudinaryImages })

  const onUpload = (result: any) => {
    if (result) {
      updateImages(result.info.secure_url)
    }
  }

  useEffect(() => {
    console.log(client.isFetching(['userImages']))
  }, [client.isFetching()])

  const isLoading = useMemo(() => {
    return isLoadingCloudinaryImages || isLoadingDBImages || isLoadingUpdateImages
  }, [isLoadingCloudinaryImages || isLoadingDBImages || isLoadingUpdateImages])

  const handleDeleteImages = () => {
    if (!isLoading) {
      const toDeleteImages = new Set(select)
      const updateImages = images.filter((el) => !toDeleteImages.has(el))
      deleteImages({ id, images: updateImages })
    }
  }

  const handleSelect = (el: string) => {
    if (!isLoading) {
      select.find((selectEl) => selectEl === el) ? setSelect(prev => prev.filter((selectEl) => selectEl !== el)) : setSelect(prev => [...prev, el])
    }
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
          disabled={select.length === 0}
        >
          Delete
        </Btn>
      </div>
      {
        <FlexLayout>
          {images.length ?
            images?.map((el) =>
              <div
                onClick={() => handleSelect(el)}
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
        </FlexLayout>
      }
    </>
  )
}