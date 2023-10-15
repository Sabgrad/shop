import { Dispatch } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { FieldValues, UseFormReset } from "react-hook-form"
import { UseMutateFunction } from "@tanstack/react-query"
import { UserSectionType, userCartType } from "./types"

export type useCreateIntentType = {
  setClientSecret: Dispatch<React.SetStateAction<string>>
}

export type useSuccessPaymentType = {
  setCurrentSection: (value: UserSectionType) => void
  router: AppRouterInstance
}

export type useRegisterUserType = {
  reset: UseFormReset<FieldValues>
}

export type useCreateProductType = {
  reset: UseFormReset<FieldValues>
}

export type useUpdateUserImagesType = {
  id: string
  images: string[]
}

export type useDeleteUserImagesType = {
  select: string[]
  deleteCloudinaryImages: UseMutateFunction<void[], unknown, string[], unknown>
}

export type useCreateOrderType = {
  setCart: React.Dispatch<React.SetStateAction<userCartType[]>>
}