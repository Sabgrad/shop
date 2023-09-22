'use client'

import { useMenuContext } from '@/context/menu-context'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MenuHeader from './menu-header'
import MenuBtns from './menu-btns'
import MenuLogoutBtn from './menu-logout-btn'
import Dash from '../items/dash'
import MenuToggleUser from './menu-toggle-user'


export default function Menu() {

  const { activeMenu, setActiveMenu } = useMenuContext()

  return (
    <>
      <AnimatePresence>
        {activeMenu &&
          <div className='fixed h-screen w-screen bg-maincolor-950/50 flex justify-start z-[900] top-0 left-0' onClick={() => setActiveMenu(false)}>
            <motion.div
              className='w-72 h-full bg-white flex flex-col'
              key='menu'
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.3 }}
            // onClick={(e) => e.stopPropagation()}
            >
              <MenuHeader setActiveMenu={setActiveMenu} />
              <MenuToggleUser />
              <div className='w-full p-2 flex flex-col gap-1'>
                <MenuBtns />
                <Dash type='x' />
                <MenuLogoutBtn />
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

    </>
  )
}