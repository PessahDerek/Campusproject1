import React, { useState } from 'react'
import Navbar from '../Componets/Navbar'
import Userlogin from './Userlogin'

const MobileLanding = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true)

  if (!isLoggedIn) return <Userlogin isUser={isLoggedIn} />
  return (
    <div className='page' id='phoneLanding'>
      <Navbar />
      <button className='toScanBtn'>
        <p>Scan Menu</p>
      </button>
    </div>
  )
}

export default MobileLanding
