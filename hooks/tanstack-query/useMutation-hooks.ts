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
  useHideProductType,
  useRegisterUserType,
  useSuccessPaymentType,
  useUpdateDeleteType,
  useUpdateProductType,
  useUpdateUserImagesType
} from '@/types/useMutation-hooks-types'

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
  triggerProductRequest,
  reset
}: useCreateProductType) => {
  return useMutation({
    mutationFn: (data: CreateProductType) => ShopService.createProduct(data),
    onSuccess: () => {
      triggerProductRequest()
      reset()
      toast.success('Product create')
    }
  })
}

export const useUpdateProduct = ({
  triggerProductRequest,
}: useUpdateProductType) => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateProductDataType }) => ShopService.updateProduct({ id, data }),
    onSuccess: () => {
      triggerProductRequest()
      toast.success('success updater')
    },
    onError: () => {
      toast.error('something went wrong')
    }
  })
}

export const useDeleteProduct = ({
  triggerProductRequest,
}: useUpdateDeleteType) => {
  return useMutation({
    mutationFn: (id: string) => ShopService.deleteProduct(id),
    onSuccess: () => {
      triggerProductRequest()
      toast.success('success delete')
    },
    onError: () => {
      toast.error('something went wrong')
    }
  })
}

export const useHideProduct = ({
  triggerProductRequest,
}: useHideProductType) => {
  return useMutation({
    mutationFn: ({ id, hide }: { id: string, hide: boolean }) => ShopService.hideProduct({ id, hide }),
    onSuccess: () => {
      triggerProductRequest()
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
  setTriggerImages
}: useUpdateUserImagesType) => {
  return useMutation({
    mutationFn: (secure_url: string) => ShopService.updateUserImages(id, images, secure_url),
    onSuccess: () => {
      setTriggerImages(q => q + 1)
    }
  })
}

export const useDeleteCloudinaryImages = () => {
  return useMutation({
    mutationFn: (ids: string[]) => ShopService.deleteCloudinaryImages(ids),
    onSuccess: () => {
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
  setUserCart,
  setCart
}: useCreateOrderType) => {
  return useMutation({
    mutationFn: ({ email, price, products, options }: CreateOrderType) => ShopService.createOrder({ email, price, products, options }),
    onSuccess: () => {
      setUserCart([])
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