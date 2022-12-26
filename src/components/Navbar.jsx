import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='w-full h-[15vh] flex justify-start items-center px-[5vw] 2xl:max-w-7xl 2xl:mx-auto'>
      <Link className='font-bold text-2xl' to='/'>BLOC</Link>
    </div>
  )
}
