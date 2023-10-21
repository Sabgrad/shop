import { ArrayOfProductId, UserSectionType } from "./types"

export type SwitchStore = {
  activeMenu: boolean
  activeCatalog: boolean
  setActiveMenu: () => void
  setActiveCatalog: (value?: boolean) => void
}

export type StringStore = {
  currentSection: UserSectionType
  setCurrentSection: (value: UserSectionType) => void
}

export type UserCartPersist = {
  userCart: ArrayOfProductId[]
  addItem: (productId: string) => void
  deleteItem: (productId: string) => void
  clearCart: () => void
}

export type WishListPersist = {
  wishList: ArrayOfProductId[]
  addItem: (productId: string) => void
  deleteItem: (productId: string) => void
  clearWishList: () => void
}

export type FilterStore = {
  price: { min: number, max: number }
  setPrice: (min: number, max: number) => void
  sort: { sortBy: string, orderBy: string }
  setSort: (sortBy: string, orderBy: string) => void
  currentCategory: string
  setCurrentCategory: (value: string) => void
  clearPrice: () => void
  clearSort: () => void
  clearCategory: () => void
  clearFilter: () => void
}

type Theme = 'light' | 'dark'

export type ThemeStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
}