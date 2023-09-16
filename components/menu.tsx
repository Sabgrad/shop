'use client'

import { useMenuContext } from '@/context/menu-context'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { AiFillShop, AiOutlineClose, AiOutlineAppstore, AiOutlineShoppingCart } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useCatalogContext } from '@/context/catalog-context'
import MenuBtn from './buttons/menu-btn'

export default function Menu() {

  const session = useSession()
  const router = useRouter()
  const { activeMenu, setActiveMenu } = useMenuContext()
  const { setActiveCatalog } = useCatalogContext()

  return (
    <>
      <AnimatePresence>
        {activeMenu &&
          <div className='fixed h-screen w-screen bg-black/40 flex justify-start z-[900] top-0 left-0' onClick={() => setActiveMenu(false)}>
            <motion.div
              className='w-72 h-full bg-white flex flex-col'
              key='menu'
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.3 }}
            // onClick={(e) => e.stopPropagation()}
            >
              <div className='w-full bg-gray-900 text-white p-2 gap-2 flex flex-row items-center'>
                <AiFillShop size={36} />
                <span className='text-3xl'>SHOP</span>
                <div className="ml-auto hover:bg-gray-700 p-2 rounded-lg transition-all" onClick={() => setActiveMenu(false)}>
                  <AiOutlineClose size={15} />
                </div>
              </div>
              <div className='w-full bg-gray-900 text-white p-2'>
                {session.status === 'authenticated' ?
                  <div className='w-full flex flex-row gap-2 hover:bg-gray-600 p-1 rounded-lg' onClick={() => router.push('/user')}>
                    <div className='font-semibold text-2xl bg-gray-800 p-2 rounded-full h-10 w-10 flex justify-center items-center'>
                      {session.data.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className='flex flex-col h-10'>
                      <span className='text-base'>
                        {session.data.user?.name}
                      </span>
                      <span className='text-xs'>
                        {session.data.user?.email}
                      </span>
                    </div>

                  </div>
                  :
                  <></>
                }
              </div>
              <div className='w-full p-2 flex flex-col gap-1'>
                <MenuBtn>
                  <AiOutlineShoppingCart size={25} /> Cart
                </MenuBtn>
                <MenuBtn onClick={() => setActiveCatalog(true)}>
                  <AiOutlineAppstore size={25} /> Catalog
                </MenuBtn>
                <Dash />
                {
                  session.status === 'authenticated' &&
                  <MenuBtn onClick={() => signOut({ callbackUrl: '/' })}>
                    Exit from account
                  </MenuBtn>
                }
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

    </>
  )
}

function Dash() {
  return <div className='w-full border-b border-black/20' />
}