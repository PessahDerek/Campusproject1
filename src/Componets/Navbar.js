import { click } from '@testing-library/user-event/dist/click'
import React, { useState } from 'react'
import './comp.css'

const Navbar = () => {
  const [clicked, setClicked] = useState(false)
  const clickAnim = () =>{
    let b1 = document.getElementById('ham1').style;
    let b2 = document.getElementById('ham2').style;
    let b3 = document.getElementById('ham3').style;
    let items = document.querySelector('.mainNav .items').style;

    let originHeight = '100%'
    if (clicked){
      b1.width = originHeight;
      b2.width = originHeight;
      b3.width = originHeight;
      items.width = '0vw'
      items.display = 'none'
    }else{
      b1.width = "90%";
      b2.width = "50%";
      b3.width = "10%";
      items.width = "60vw";
      items.display = 'grid';
    }
    setClicked(!clicked)
  }
  return (
    <nav className='mainNav'>
        <h1>Roaster's Digital Menu</h1>
        <div>
          <button onClick={clickAnim}>
            <div id='ham1' />
            <div id='ham2' />
            <div id='ham3' />
          </button>
          <div className='items'>
            <button>My Account</button>
            <button>My History</button>
            <button>Help</button>
          </div>
        </div>
    </nav>
  )
}

export default Navbar
