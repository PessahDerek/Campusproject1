import React, { useEffect, useRef, useState } from 'react'
import AdminAuth from './AdminAuth'
import './Admin.css'
import AdminNav from './Components/AdminNav'
import { Route, Routes } from 'react-router-dom'
import MenuPage from './Components/MenuPage'
import SetupRestaurant from './Components/SetupRestaurant'
import OrdersPage from './Components/OrdersPage'
import Printpage from './Components/Printpage'
import Analytics from './Components/Analytics'

const Admindash = () => {
  const [isLoggedin, setIsloggedin] = useState("")

    useEffect(()=>{
      try {
        setIsloggedin(localStorage.getItem("currentAdmin"))
      } catch (error) {
        setIsloggedin("")
      }
    }, [])


    // approve login first before proceeding
    if (!isLoggedin) return <AdminAuth 
      setLoggedIn={setIsloggedin}
    />

  return (
    <div className='adminDashboard'>
      <AdminNav />
      <Routes>
        <Route path='/*' element={<OrdersPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/setuprestaurant/*' element={<SetupRestaurant />} />
        <Route path='/analytics/*' element=<Analytics /> />
        <Route path='print' element={<Printpage />} />
      </Routes>
    </div>
  )
}

export default Admindash
