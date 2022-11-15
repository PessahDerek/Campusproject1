import React, { useEffect, useState } from 'react'
import MobileLanding from './MobileLanding'
import Userlogin from './Userlogin'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
    const [win, setWindow] = useState()
    const [isMobile, setIsMobile] = useState()
    const [isUser, setIsUser] = useState(false)

    window.addEventListener('resize', ()=>{
      setWindow(window.innerWidth)
    })

    useEffect(()=>{
      setWindow(window.innerWidth)
      setIsMobile(window.clientInformation.userAgent.includes('Mobile'))
      
      try {
        setIsUser(localStorage.getItem('roastersUser'))
      } catch (error) {
        
      }

    }, [])

    if (win < 800 || isMobile){
      if(isUser)return <MobileLanding />
      return <Userlogin 
        isUser={isUser}
        setUser={setIsUser}
      />
    } 

  return (
    <div className='page' id='landing' style={{
      display: 'grid',
      gridAutoFlow: 'row',
      height: '100vh'
    }}>
      <h1>Roaster's Digital Menu</h1>
      <img src={logo} alt='icon' style={{
        marginLeft: 'auto',
        marginRight: "auto",
        width: '30%',
        objectFit: 'contain'
      }} />
      <h2>Roaster's Menu Application is only accessible on mobile devices
      </h2>
      <button className='btn1'
        onClick={()=>window.open('http://www.thelukehotel.co.ke/','_blank')}
      >
        Head to the main website
      </button>
    </div>
  )
}

export default Landing
