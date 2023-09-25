'use client'

import { useCatalogContext } from '@/context/catalog-context'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function Catalog() {

  const { activeCatalog, setActiveCatalog } = useCatalogContext()

  return (
    <>
      <AnimatePresence>
        {activeCatalog &&
          <div className='bg-black/10 absolute h-full w-full top-0 left-0 text-black z-[900] flex justify-center sm:p-[4.5rem]' onClick={() => setActiveCatalog(false)}>
            <motion.div
              className=' bg-white flex flex-col h-full w-full p-2 
              sm:h-max sm:w-4/5 sm:rounded-lg'
              key='menu'
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              catalog
            </motion.div>
          </div>
        }
      </AnimatePresence>

    </>
  )
}
