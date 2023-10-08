import { UserMenuData } from "@/lib/data";
import { Order, Product } from "@prisma/client";

export type Orders = Order & { products: Product[] }

export type userCartType = ProductsByIdsType & { quantity: number }

export type ProductsByIdsType = Omit<Product, 'orderIds'>

export type UserSectionType = typeof UserMenuData[number]['title']

export type OrderTypePayment = {
  price: number
  paid: boolean
}

export type UpdateProductDataType = {
  name: string
  description: string
  price: number
  category: string
  discount: number
  actual_price: number
  images: string[]
}

export type CreateProductType = {
  name: string
  description: string
  price: number
  category: string
  discount: number
  actual_price: number
  image: string
  userId: string
}

export type CreateOrderType = {
  email: string
  price: number
  products: { id: string }[]
  options: Object
}

export type Group = {
  title: string
  subCategory: {
    title: string
  }[]
}

export type Main = {
  title: string
  groups: Group[]
}