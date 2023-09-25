import React from 'react'
import MenuToggle from './menu-toggle'
import ShopToggle from './shop-toggle'
import CatalogToggle from './catalog-toggle'
import SearchHeaderForm from '../forms/search-header-form'
import SettingsToggle from './settings-toggle'
import Auth from '../auth/auth'
import CartToggle from './cart-toggle'


export default function Header() {

  return (
    <header className="h-[4.5rem] z-[800] fixed top-0 bg-maincolor-950/90 w-full px-1 sm:px-6 text-xl text-white flex items-center gap-2 backdrop-blur-lg">
      <MenuToggle />
      <ShopToggle />
      <CatalogToggle />
      <SearchHeaderForm />
      <SettingsToggle />
      <Auth />
      <CartToggle />
    </header>
  )
}