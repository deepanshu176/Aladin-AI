import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { X, Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setsidebar] = useState(true) 
  const { user } = useUser()

  return user ? (
    <div className='h-screen flex flex-col'>
      <nav className='w-full flex items-center justify-between border-b border-gray-200 bg-white shadow-sm px-4'>
        <img
          src={assets.logo}
          alt="Logo"
          className='w-28 sm:w-36 cursor-pointer'
          onClick={() => navigate('/')}
        />
        {sidebar ? (
          <X
            onClick={() => setsidebar(false)}
            className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer'
          />
        ) : (
          <Menu
            onClick={() => setsidebar(true)}
            className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer'
          />
        )}
      </nav>

      <div className='flex flex-1 h-[calc(100vh-64px)] overflow-hidden'>
        <Sidebar sidebar={sidebar} setsidebar={setsidebar} />
        
        <div className='flex-1 overflow-y-auto bg-[#F4F7FB] p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout
