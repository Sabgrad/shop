import ShopService from '@/services/services'
import { CreateOrderType, CreateProductType, UpdateProductDataType } from '@/types/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  useCreateIntentType,
  useCreateOrderType,
  useCreateProductType,
  useDeleteUserImagesType,
  useRegisterUserType,
  useSuccessPaymentType,
  useUpdateUserImagesType
} from '@/types/useMutation-hooks-types'
import { useUserCartStorage } from '@/context/zustand'

export const useCreateIntent = ({
  setClientSecret
}: useCreateIntentType) => {
  return useMutation({
    mutationFn: (order_id: string) => ShopService.createIntent(order_id),
    onSuccess: ({ data }) => {
      setClientSecret(data.client_secret)
    }
  })
}

export const useSuccessPayment = ({
  setCurrentSection,
  router
}: useSuccessPaymentType) => {
  return useMutation({
    mutationFn: (intent_id: string) => ShopService.successPayment(intent_id),
    onSuccess: () => {
      toast.success('Success payment')
      setCurrentSection('My orders')
      router.push('/user')
    }
  })
}

export const useRegisterUser = ({
  reset
}: useRegisterUserType) => {
  return useMutation({
    mutationFn: (data: FieldValues) => ShopService.register(data),
    onSuccess: (_, variables) => {
      signIn('credentials', variables)
      toast.success('Now your have an account')
      reset()
    },
  })
}

export const useCreateProduct = ({
  reset
}: useCreateProductType) => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateProductType) => ShopService.createProduct(data),
    onSuccess: () => {
      client.invalidateQueries(['userProducts'])
      reset()
      toast.success('Product create')
    }
  })
}

export const useUpdateProduct = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateProductDataType }) => ShopService.updateProduct({ id, data }),
    onSuccess: () => {
      client.invalidateQueries(['userProducts'])
      toast.success('success updater')
    },
    onError: () => {
      toast.error('something went wrong')
    }
  })
}

export const useDeleteProduct = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ShopService.deleteProduct(id),
    onSuccess: () => {
      client.invalidateQueries(['userProducts'])
      toast.success('success delete')
    },
    onError: () => {
      toast.error('something went wrong')
    }
  })
}

export const useHideProduct = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, hide }: { id: string, hide: boolean }) => ShopService.hideProduct({ id, hide }),
    onSuccess: () => {
      client.invalidateQueries(['userProducts'])
      toast.success('success hide product')
    },
    onError: () => {
      toast.error('something went wrong')
    }
  })
}

export const useUpdateUserImages = ({
  id,
  images,
}: useUpdateUserImagesType) => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (secure_url: string) => ShopService.updateUserImages(id, images, secure_url),
    onSuccess: () => {
      client.invalidateQueries(['userImages'])
    }
  })
}

export const useDeleteCloudinaryImages = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: (ids: string[]) => ShopService.deleteCloudinaryImages(ids),
    onSuccess: () => {
      client.invalidateQueries(['userImages'])
      toast.success('images deleted from cloud')
    }
  })
}

export const useDeleteUserImages = ({
  select,
  deleteCloudinaryImages
}: useDeleteUserImagesType) => {
  return useMutation({
    mutationFn: ({ id, images }: { id: string, images: string[] }) => ShopService.deleteImages({ id, images }),
    onSuccess: () => {
      toast.success('images deleted from db')
      deleteCloudinaryImages(select)
    }
  })
}

export const useCreateOrder = ({
  setCart
}: useCreateOrderType) => {

  const { clearCart } = useUserCartStorage()

  return useMutation({
    mutationFn: ({ email, price, products, options }: CreateOrderType) => ShopService.createOrder({ email, price, products, options }),
    onSuccess: () => {
      clearCart()
      setCart([])
    },
  })
}

export const useUpdateOrderPrice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (promises: any[]) => Promise.all(promises),
    onSettled: async () => {
      await queryClient.invalidateQueries(['userOrders'])
    }
  })
}