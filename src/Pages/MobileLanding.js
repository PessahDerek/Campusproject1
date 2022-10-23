import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Componets/Navbar'
import Userlogin from './Userlogin'

const MobileLanding = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true)

  if (!isLoggedIn) return <Userlogin isUser={isLoggedIn} />
  return (
    <div className='page' id='phoneLanding'>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <button className='toScanBtn'>
            <p>Scan Menu</p>
          </button>
        } />

        <Route path='/scan'  />
      </Routes>
      
    </div>
  )
}

export default MobileLanding
