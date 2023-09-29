import { Order, Product } from "@prisma/client";

export type Orders = Order & { products: Product[] }

export type userCartType = Product & { quantity: number }