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
            {text: "My Account", path: ""},
            {text: "Settings", path: ""},
          ]}
        />
    </nav>
  )
}

export default Navbar
