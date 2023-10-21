import { FilterStore, StringStore, SwitchStore, ThemeStore, UserCartPersist, WishListPersist } from "@/types/zustand-types"
import { create } from "zustand"
import { persist } from 'zustand/middleware'

export const useSwitchStore = create<SwitchStore>((set) => ({
  activeMenu: false,
  activeCatalog: false,
  setActiveMenu: () => set((state) => ({ activeMenu: !state.activeMenu })),
  setActiveCatalog: (value) => set((state) => ({ activeCatalog: value !== undefined ? value : !state.activeCatalog })),
}))

export const useStringStore = create<StringStore>((set) => ({
  currentSection: 'Me',
  setCurrentSection: (value) => set(() => ({ currentSection: value })),
}))

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

export const useFilterStore = create<FilterStore>((set) => ({
  price: { min: 0, max: 999999 },
  setPrice: (min, max) => set(() => ({ price: { min, max } })),
  sort: { sortBy: '', orderBy: '' },
  setSort: (sortBy, orderBy) => set(() => ({ sort: { sortBy, orderBy } })),
  currentCategory: '',
  setCurrentCategory: (value) => set(() => ({ currentCategory: value })),
  clearPrice: () => set(() => ({ price: { min: 0, max: 999999 } })),
  clearSort: () => set(() => ({ sort: { sortBy: '', orderBy: '' } })),
  clearCategory: () => set(() => ({ currentCategory: '' })),
  clearFilter: () => set(() => ({
    price: { min: 0, max: 999999 },
    sort: { sortBy: '', orderBy: '' },
    currentCategory: '',
  }))
}))

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: 'theme',
    }
  ))