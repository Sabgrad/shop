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
    <header className="h-[4.5rem] z-[800] fixed top-0 w-full px-2 text-xl flex items-center gap-2 backdrop-blur-lg border-b border-black">
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