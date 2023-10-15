import { UserSectionType } from "@/types/types"
import { create } from "zustand"
import { persist } from 'zustand/middleware'

type SwitchStore = {
  activeMenu: boolean
  activeCatalog: boolean
  setActiveMenu: () => void
  setActiveCatalog: (value?: boolean) => void
}

export const useSwitchStore = create<SwitchStore>((set) => ({
  activeMenu: false,
  activeCatalog: false,
  setActiveMenu: () => set((state) => ({ activeMenu: !state.activeMenu })),
  setActiveCatalog: (value) => set((state) => ({ activeCatalog: value !== undefined ? value : !state.activeCatalog })),
}))

type StringStore = {
  currentCategory: string
  currentSection: UserSectionType
  setCurrentCategory: (value: string) => void
  setCurrentSection: (value: UserSectionType) => void
}

export const useStringStore = create<StringStore>((set) => ({
  currentCategory: '',
  currentSection: 'Me',
  setCurrentCategory: (value) => set(() => ({ currentCategory: value })),
  setCurrentSection: (value) => set(() => ({ currentSection: value }))
}))

type ArrayOfProductId = {
  productId: string
}

type UserCartPersist = {
  userCart: ArrayOfProductId[]
  addItem: (productId: string) => void
  deleteItem: (productId: string) => void
  clearCart: () => void
}

export const useUserCartStorage = create(
  persist<UserCartPersist>(
    (set, get) => ({
      userCart: [],
      addItem: (productId: string) => {
        const newCart = [...get().userCart, { productId: productId }]
        set({ userCart: newCart })
      },
      deleteItem: (productId: string) => {
        const newCart = get().userCart.filter((el) => el.productId !== productId)
        set({ userCart: newCart })
      },
      clearCart: () => set({ userCart: [] })
    }),
    {
      name: 'user-cart',
    }
  )
)

type WishListPersist = {
  wishList: ArrayOfProductId[]
  addItem: (productId: string) => void
  deleteItem: (productId: string) => void
  clearWishList: () => void
}

export const useWishListStorage = create(
  persist<WishListPersist>(
    (set, get) => ({
      wishList: [],
      addItem: (productId: string) => {
        const newWishList = [...get().wishList, { productId: productId }]
        set({ wishList: newWishList })
      },
      deleteItem: (productId: string) => {
        const newWishList = get().wishList.filter((el) => el.productId !== productId)
        set({ wishList: newWishList })
      },
      clearWishList: () => set({ wishList: [] })
    }),
    {
      name: 'wish-list',
    }
  )
)