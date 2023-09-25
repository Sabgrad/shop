import { Product, Order, OrderItem } from "@prisma/client";

export type userCartType = Product & { amount: number }

export type orderItemType = OrderItem & { product: Product }

export type userOrderType = Order & { products: orderItemType[] }