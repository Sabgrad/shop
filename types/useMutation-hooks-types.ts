import { Dispatch } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { FieldValues, UseFormReset } from "react-hook-form"
import { UseMutateFunction } from "@tanstack/react-query"
import { UserSectionType, userCartType } from "./types"

export type useCreateIntentType = {
  setClientSecret: Dispatch<React.SetStateAction<string>>
}

export type useSuccessPaymentType = {
  setCurrentSection: Dispatch<React.SetStateAction<UserSectionType>>
  router: AppRouterInstance
}

export type useRegisterUserType = {
  reset: UseFormReset<FieldValues>
}

export type useCreateProductType = {
  triggerProductRequest: () => void
  reset: UseFormReset<FieldValues>
}

export type useUpdateProductType = {
  triggerProductRequest: () => void
}

export type useUpdateDeleteType = {
  triggerProductRequest: () => void
}

export type useHideProductType = {
  triggerProductRequest: () => void
}

export type useUpdateUserImagesType = {
  id: string
  images: string[]
  setTriggerImages: Dispatch<React.SetStateAction<number>>
}

export type useDeleteUserImagesType = {
  select: string[]
  deleteCloudinaryImages: UseMutateFunction<void[], unknown, string[], unknown>
}

export type useCreateOrderType = {
  setUserCart: React.Dispatch<React.SetStateAction<{ productId: string; }[]>>
  setCart: React.Dispatch<React.SetStateAction<userCartType[]>>
}