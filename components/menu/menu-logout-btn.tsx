import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Btn from '../buttons/btn'

export default function MenuLogoutBtn() {

  const session = useSession()

  return (
    <>
      {
        session.status === 'authenticated' &&
        <Btn onClick={() => signOut({ callbackUrl: '/' })} className='!justify-start'>
          Exit from account
        </Btn>
      }
    </>
  )
}
