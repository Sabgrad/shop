'use client'

import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import Btn from '../buttons/btn'
import { AiFillSetting } from 'react-icons/ai'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useThemeStore } from '@/context/zustand'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const variants = {
  dark: { justifyContent: 'flex-end' },
  light: { justifyContent: 'flex-start' },
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}


export default function SettingsToggle() {

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || 'light') {
      root.classList.remove(theme === 'light' ? 'dark' : 'light');
      root.classList.add(theme);
    }
  }, [theme])

  useClickOutside(ref, () => setOpen(false))

  return (
    <div className='relative'>
      <Btn onClick={() => setOpen(true)} disabled={open}>
        <AiFillSetting size={28} />
      </Btn>
      {
        open &&
        <div
          className={clsx(
            'absolute p-2 gap-2 rounded-b border-x border-b top-[47px] right-0 flex flex-col w-max',
            'dark:border-maincolor-50/30 border-maincolor-950/30 bg-white dark:bg-black'
          )}
          ref={ref}
        >
          <div
            className={clsx(
              'w-16 h-8 px-1 rounded-l-full rounded-r-full border flex items-center justify-start',
              'border-maincolor-950/30 dark:border-maincolor-50/30',
              theme === 'dark' && 'justify-end'
            )}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <motion.div layout transition={{ duration: 0.15 }} className='w-6 h-6 rounded-full bg-black dark:bg-white' />
          </div>
          <Btn>
            EU
          </Btn>
        </div>
      }
    </div>
  )
}