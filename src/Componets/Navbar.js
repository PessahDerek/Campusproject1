import { click } from '@testing-library/user-event/dist/click'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './comp.css'
import Dropdown from './Dropdown'

const Navbar = () => {
  const tbNumber = useSelector(state=>state.order_slice.tableNumber)

  return (
    <nav className='mainNav'>
        <h1>Roaster's</h1>
        <p>{tbNumber ? `Table Number: ${tbNumber}`: "Scan for table number"
        }</p>
        <Dropdown 
          buttons={[
            {text: "My Account", path: "/myaccount"},
            {text: "Rate Us", path: "/rateus"},
          ]}
        />
    </nav>
  )
}

export default Navbar
