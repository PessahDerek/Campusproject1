import React, { useEffect, useState } from 'react'
import MobileLanding from './MobileLanding'
import Userlogin from './Userlogin'

const Landing = () => {
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
    <div className='page' id='landing'>
      <h1>Say world</h1>
    </div>
  )
}

export default Landing
