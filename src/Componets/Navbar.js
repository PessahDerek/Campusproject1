import { click } from '@testing-library/user-event/dist/click'
import React, { useState } from 'react'
import './comp.css'
import Dropdown from './Dropdown'

const Navbar = () => {
  return (
    <nav className='mainNav'>
        <h1>Roaster's Digital Menu</h1>
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
