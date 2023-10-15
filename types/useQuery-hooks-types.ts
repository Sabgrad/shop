import { Product, User } from "@prisma/client"
import { UseMutateFunction } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { userCartType } from "./types"

export type useFetchMaxHomePaginationType = {
  currentCategory: string
  price: {
    min: number
    max: number
  }
}

export type useFetchHomeByFilterType = {
  currentCategory: string
  price: {
    min: number
    max: number
  }
  sort: {
    sortBy: string
    orderBy: string
  }
  setPagination: Dispatch<React.SetStateAction<number>>
  setProducts: Dispatch<React.SetStateAction<Product[]>>
}

export type useFetchHomeByPaginationType = {
  currentCategory: string
  pagination: number
  price: {
    min: number
    max: number
  }
  sort: {
    sortBy: string
    orderBy: string
  }
  setProducts: Dispatch<React.SetStateAction<Product[]>>
}

export type useFetchOrderPayPageType = {
  id: string
  createIntent: UseMutateFunction<AxiosResponse<any, any>, unknown, string, unknown>
}

export type useFetchProductPageType = {
  id: string
}

export type useFetchProductInCartType = {
  userCart: { productId: string }[]
  setCart: Dispatch<React.SetStateAction<userCartType[]>>
}

export type useFetchUserOrdersType = {
  updateOrderPrice: UseMutateFunction<any[], unknown, any[], unknown>
}

export type useFetchUserShopProductsType = {
  user: User | undefined
}

export type useFetchUserShopImagesType = {
  user: User | undefined
}

export type useFetchUserType = {
  email: string | undefined | null
}