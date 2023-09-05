import { Product, Image } from "@prisma/client";

export type ProductType = Product & { image: Image[] }