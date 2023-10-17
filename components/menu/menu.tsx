'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MenuHeader from './menu-header'
import MenuBtns from './menu-btns'
import MenuLogoutBtn from './menu-logout-btn'
import MenuToggleUser from './menu-toggle-user'
import { useSwitchStore } from '@/context/zustand'

export default function Menu() {

  const { activeMenu, setActiveMenu } = useSwitchStore()

  return (
    <>
      <AnimatePresence>
        {activeMenu &&
          <div className='fixed h-screen w-screen bg-maincolor-950/50 flex justify-start z-[900] top-0 left-0' onClick={() => setActiveMenu()}>
            <motion.div
              className='w-72 h-full dark:bg-black bg-white flex flex-col border-r border-maincolor-950/30 dark:border-maincolor-50/30'
              key='menu'
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuHeader />
              <MenuToggleUser />
              <div className='w-full p-2 flex flex-col gap-1'>
                <MenuBtns />
                <MenuLogoutBtn />
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

    </>
  )
}