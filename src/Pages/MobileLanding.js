import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Attention from '../Componets/Attention'
import Navbar from '../Componets/Navbar'
import TrayBtn from '../Componets/TrayBtn'
import QRScanpage from './QRScanpage'
import Userlogin from './Userlogin'

const MobileLanding = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true)
  const navigate = useNavigate()

  if (!isLoggedIn) return <Userlogin isUser={isLoggedIn} />
  return (
    <div className='page' id='phoneLanding'>
      <TrayBtn />
      <Attention />
      <Navbar />
      <Routes>
        <Route exact path='/*' element={
          <button className='toScanBtn' onClick={()=>navigate('/scan')}>
            <p>Scan Menu</p>
          </button>
        } />

        <Route exact path='/scan' element={<QRScanpage />} />
      </Routes>
      
    </div>
  )
}

export default MobileLanding
