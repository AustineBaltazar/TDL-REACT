import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeSidebar from '../component/HomeSidebar.jsx'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className='main-layout'>
      <div className='sidebar'><HomeSidebar /></div>
      <div className='main-content'><Outlet /></div>
    </div>
  )
}

export default MainLayout