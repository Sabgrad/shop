import ProductUpdaterForm from '@/components/forms/product-update-form'
import Modal from '@/components/modals/modal'
import { ProductCardType } from '@/types/types'
import { Product } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'

type ProductUpdateModalProps = {
  activeModal: boolean
  setActiveModal: Dispatch<SetStateAction<boolean>>
  type: ProductCardType
  imagesData?: string[]
  product: Product
}

export default function ProductUpdateModal({
  activeModal,
  setActiveModal,
  type,
  imagesData,
  product,
}: ProductUpdateModalProps) {

  if (type !== 'user' || imagesData === undefined) return null

  return (
    < Modal active={activeModal} setActive={setActiveModal}>
      <ProductUpdaterForm imagesData={imagesData} product={product} />
    </Modal >
  )
}