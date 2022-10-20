import React, { useEffect, useRef, useState } from 'react'
import AdminAuth from './AdminAuth'
import './Admin.css'
import AdminNav from './Components/AdminNav'
import { Route, Routes } from 'react-router-dom'
import MenuPage from './Components/MenuPage'

const Admindash = () => {
  const [isLoggedin, setIsloggedin] = useState(false)

    useEffect(()=>{
      try {
        setIsloggedin(localStorage.getItem("isLogged"))
      } catch (error) {
        setIsloggedin(false)
      }
    }, [])


    // approve login first before proceeding
    if (!isLoggedin) return <AdminAuth />

  return (
    <div className='adminDashboard'>
      <AdminNav />
      <Routes>
        <Route path='/menu' element={<MenuPage />} />
      </Routes>
    </div>
  )
}

export default Admindash
