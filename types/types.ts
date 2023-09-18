import { Product, Image, Order, OrderItem } from "@prisma/client";

export type ProductType = Product & { image: Image[] }

export type userCartType = ProductType & { amount: number }

export type orderItemType = OrderItem & { product: ProductType }

export type userOrderType = Order & { products: orderItemType[] }