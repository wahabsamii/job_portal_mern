import React from 'react'
import { Outlet } from 'react-router-dom'
import SeekerSidebar from '../../components/SeekerSidebar'

function SeekerLayout() {
  return (
    <div className='h-screen flex overflow-hidden bg-gray-50'>
        <SeekerSidebar />
        {/* Page content  */}
        <main className='flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden p-6'>
            <Outlet />
        </main>
    </div>
  )
}

export default SeekerLayout