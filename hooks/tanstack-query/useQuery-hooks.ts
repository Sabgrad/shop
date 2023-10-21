import ShopService from '@/services/services'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  useFetchHomeByFilterType,
  useFetchHomeByPaginationType,
  useFetchMaxHomePaginationType,
  useFetchOrderPayPageType,
  useFetchProductInCartType,
  useFetchProductInWishListType,
  useFetchProductPageType,
  useFetchUserOrdersType,
  useFetchUserShopImagesType,
  useFetchUserShopProductsType,
} from '@/types/useQuery-hooks-types'
import { useSession } from 'next-auth/react'

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

export const useFetchProductInWishList = ({
  wishList,
}: useFetchProductInWishListType) => {
  return useQuery({
    queryKey: ['proucts-in-cart', wishList],
    queryFn: () => ShopService.getProductsByIds(wishList.map((el) => el.productId).join(',')),
    enabled: wishList.length > 0,
    select: ({ data }) => { return data }
  })
}

export const useFetchUserOrders = ({
  updateOrderPrice
}: useFetchUserOrdersType) => {

  const session = useSession()
  let email = session.data?.user?.email

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
}: useFetchUserShopProductsType) => {
  return useQuery({
    queryKey: ['userProducts', user],
    queryFn: () => ShopService.getUserProducts(user?.id as string),
    select: ({ data }) => { return data },
  })
}

export const useFetchUserShopImages = ({
  user,
}: useFetchUserShopImagesType) => {
  return useQuery({
    queryKey: ['userImages', user],
    queryFn: () => ShopService.getUserImages(user?.id as string),
    select: ({ data }) => { return data.images },
  })
}

export const useFetchUser = () => {

  const client = useQueryClient()
  const session = useSession()
  let email = session.data?.user?.email

  return useQuery({
    queryKey: ['user-context', email],
    queryFn: () => ShopService.getUser(email as string),
    enabled: !!email,
    select: ({ data }) => { return data },
    onSettled: () => {
      client.invalidateQueries(['userProducts'])
    }
  })
}

export const useFetchUserReview = ({
  id
}: { id: string }) => {
  return useQuery({
    queryKey: ['userReviews', id],
    queryFn: () => ShopService.getReviews(id),
    enabled: !!id,
    select: (({ data }) => { return data })
  })
}