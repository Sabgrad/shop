import ShopService from '@/services/services'
import { useQuery } from '@tanstack/react-query'
import {
  useFetchHomeByFilterType,
  useFetchHomeByPaginationType,
  useFetchMaxHomePaginationType,
  useFetchOrderPayPageType,
  useFetchProductInCartType,
  useFetchProductPageType,
  useFetchUserOrdersType,
  useFetchUserShopImagesType,
  useFetchUserShopProductsType,
  useFetchUserType
} from '@/types/useQuery-hooks-types'

export const useFetchMaxHomePagination = ({
  currentCategory,
  price
}: useFetchMaxHomePaginationType) => {
  return useQuery({
    queryKey: ['maxPagination', currentCategory, price],
    queryFn: () => ShopService.getHomePageCount(currentCategory, price.min, price.max),
    select: ({ data }) => Math.ceil(data / Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE)),
  })
}

export const useFetchHomeByFilter = ({
  currentCategory,
  price,
  sort,
  setPagination,
  setProducts
}: useFetchHomeByFilterType) => {
  return useQuery({
    queryKey: ['productsQuery', currentCategory, price, sort],
    queryFn: () => ShopService.getProductsByPagination(1, currentCategory, price.min, price.max, sort.sortBy, sort.orderBy),
    keepPreviousData: false,
    onSuccess: ({ data }) => {
      setPagination(1)
      setProducts(data)
    },
  })
}

export const useFetchHomeByPagination = ({
  currentCategory,
  pagination,
  price,
  sort,
  setProducts
}: useFetchHomeByPaginationType) => {
  return useQuery({
    queryKey: ['productsPagination', pagination],
    queryFn: () => ShopService.getProductsByPagination(pagination, currentCategory, price.min, price.max, sort.sortBy, sort.orderBy),
    keepPreviousData: true,
    enabled: pagination > 1,
    onSuccess: ({ data }) => {
      setProducts(prev => [...prev, ...data])
    },
  })
}

export const useFetchOrderPayPage = ({
  id,
  createIntent
}: useFetchOrderPayPageType) => {
  return useQuery({
    queryKey: ['order-pay-page', id],
    queryFn: () => ShopService.getOrderById(id),
    enabled: !!id,
    select: ({ data }) => { return data },
    onSuccess: (data) => {
      if (data && !data.paid)
        createIntent(id)
    }
  })
}

export const useFetchProductPage = ({
  id
}: useFetchProductPageType) => {
  return useQuery({
    queryKey: ['productPage', id],
    queryFn: () => ShopService.getProductById(id),
    enabled: !!id,
    select: ({ data }) => { return data }
  })
}

export const useFetchProductInCart = ({
  userCart,
  setCart
}: useFetchProductInCartType) => {
  return useQuery({
    queryKey: ['proucts-in-cart', userCart],
    queryFn: () => ShopService.getProductsByIds(userCart.map((el) => el.productId).join(',')),
    enabled: userCart.length > 0,
    onSuccess: ({ data }) => {
      setCart(data.map((el) => ({ ...el, quantity: 1 })))
    },
  })
}

export const useFetchUserOrders = ({
  email,
  updateOrderPrice
}: useFetchUserOrdersType) => {
  return useQuery({
    queryKey: ['userOrders', email],
    queryFn: () => ShopService.getUserOrders(email as string),
    enabled: !!email,
    select: ({ data }) => { return data },
    onSuccess: (data) => {
      if (data && data.length) {
        let promise = new Array

        data.forEach((order) => {
          if (!order.paid) {
            //@ts-ignore
            let newPrice = order.products.reduce((acc, product) => acc + product.actual_price * order.options[product.id], 0)
            if (order.price !== newPrice) {
              promise.push(ShopService.updateUserOrder(order.id, newPrice))
            }
          }
        })

        if (promise.length > 0) {
          updateOrderPrice(promise)
        }
      }
    },
  })
}

export const useFetchUserShopProducts = ({
  user,
  triggerProduct
}: useFetchUserShopProductsType) => {
  return useQuery({
    queryKey: ['userProducts', user, triggerProduct],
    queryFn: () => ShopService.getUserProducts(user?.id as string),
    enabled: !!user && !!user.id,
    select: ({ data }) => { return data },
  })
}

export const useFetchUserShopImages = ({
  user,
  triggerImages
}: useFetchUserShopImagesType) => {
  return useQuery({
    queryKey: ['userImages', user, triggerImages],
    queryFn: () => ShopService.getUserImages(user?.id as string),
    enabled: !!user && !!user.id,
    select: ({ data }) => { return data.images },
  })
}

export const useFetchUser = ({
  email,
  setTriggerProduct
}: useFetchUserType) => {
  return useQuery({
    queryKey: ['user-context', email],
    queryFn: () => ShopService.getUser(email as string),
    enabled: !!email,
    select: ({ data }) => { return data },
    onSuccess: () => {
      setTriggerProduct(v => v + 1)
    }
  })
}