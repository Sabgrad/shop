import { CreateOrderType, CreateProductType, OrderTypePayment, Orders, ProductPageType, ProductsByIdsType, UpdateProductDataType } from "@/types/types"
import { Product, User } from "@prisma/client"
import axios from "axios"
import { generateSHA1, generateSignature } from "@/lib/cloudinary-helpers"
import { extractPublicId } from "cloudinary-build-url"

const URL = process.env.NEXT_PUBLIC_DEV_URL || process.env.NEXT_PUBLIC_URL

class ShopService {

  async getHomePageCount(category: string, min: number, max: number,) {
    return await axios.get<number>('/api/count', {
      params: {
        category,
        min,
        max
      }
    })
  }

  async getProductById(id: string) {
    return await axios.get<ProductPageType>(URL + `/api/product/${id}`)
  }

  async getProductsByIds(ids: string) {
    return await axios.get<Omit<Product, 'orderIds'>[]>('/api/product/ids', {
      params: {
        ids: ids
      }
    })
  }

  async getProductsByPagination(page: number, category: string, min: number, max: number, sortBy: string, orderBy: string) {
    return await axios.get<Product[]>('/api/product', {
      params: {
        page,
        category,
        min,
        max,
        sortBy,
        orderBy,
      }
    })
  }

  async getUserProducts(id: string) {
    return await axios.get<ProductsByIdsType[]>(`/api/user/product`, {
      params: {
        user_id: id
      }
    })
  }

  async getUserImages(id: string) {
    return await axios.get<{ images: string[] }>(`/api/user/images`, {
      params: {
        user_id: id
      }
    })
  }

  async getUser(email: string) {
    return await axios.get<User>(`/api/user/${email}`)
  }

  async getUserOrders(email: string) {
    return await axios.get<Orders[]>('/api/user/order', {
      params: {
        user_email: email
      }
    })
  }

  async updateUserOrder(id: string, price: number) {
    return await axios.patch(`/api/order/${id}`, {
      price: price
    })
  }

  async updateUserImages(id: string, images: string[], secure_url: string) {
    return await axios.patch(`/api/user/images/${id}`, {
      images: [...images, secure_url]
    })
  }

  async createOrder({ email, price, products, options }: CreateOrderType) {
    return await axios.post('/api/order', {
      email,
      status: 'Processed',
      price,
      products,
      options,
    })
  }

  async hideProduct({ id, hide }: { id: string, hide: boolean }) {
    return await axios.patch(`/api/product/hide/${id}`, {
      hide
    })
  }

  async deleteProduct(id: string) {
    return await axios.delete(`/api/product/${id}`)
  }

  async updateProduct({ id, data }: { id: string, data: UpdateProductDataType }) {
    const { name, description, price, category, discount, actual_price, images } = data
    return await axios.patch(`/api/product/${id}`, {
      name, description, price, category, discount, actual_price, images
    })
  }

  async createProduct(data: CreateProductType) {
    return await axios.post('/api/product', {
      ...data,
    })
  }

  async deleteImages({ id, images }: { id: string, images: string[] }) {
    return await axios.patch(`/api/user/images/${id}`, {
      images
    })
  }

  private async deleteImageOnCloudinary(public_id: string) {
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
    const timestamp = new Date().getTime()
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`
    const signature = generateSHA1(generateSignature(public_id, api_secret))

    await axios.post(url, {
      public_id,
      signature,
      api_key,
      timestamp,
    })
  }

  async deleteCloudinaryImages(publick_ids: string[]) {
    const promises = publick_ids.map((id) => this.deleteImageOnCloudinary(extractPublicId(id)))

    return Promise.all(promises)
  }

  async register(data: any) {
    return await axios.post('/api/register', data)
  }

  async successPayment(intent_id: string) {
    return await axios.patch(`/api/confirm/${intent_id}`)
  }

  async getOrderById(id: string) {
    return await axios.get<OrderTypePayment>(`/api/order/${id}`)
  }

  async createIntent(order_id: string) {
    return await axios.post(`/api/create-intent/${order_id}`)
  }

  async createReview(data: any) {
    return await axios.post('/api/review', data)
  }
}

export default new ShopService()