'use client'

import React, { Dispatch, SetStateAction } from 'react'
import Btn from '../buttons/btn'

type HomePaginationBtnProps = {
  isLoadingPagination: boolean
  pagination: number
  maxPagination: number
  setPagination: Dispatch<SetStateAction<number>>
  length: boolean
}

export default function HomePaginationBtn({
  isLoadingPagination,
  pagination,
  maxPagination,
  setPagination,
  length
}: HomePaginationBtnProps) {

  const handleDownloadMore = () => {
    if (pagination !== maxPagination && pagination < maxPagination) {
      setPagination(prev => prev + 1)
    }
  }

  return (
    <>
      {
        pagination !== maxPagination && pagination < maxPagination && length &&
        <Btn className=" w-max flex p-1 text-xl items-center gap-2" onClick={handleDownloadMore}>
          {isLoadingPagination && <div className="h-5 w-5 border-t-2  border-black dark:border-white rounded-full animate-spin" />} Load more
        </Btn>
      }
    </>
  )
}