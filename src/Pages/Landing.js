import React, { useEffect, useState } from 'react'
import MobileLanding from './MobileLanding'

const Landing = () => {
    const [win, setWindow] = useState()
    const [isMobile, setIsMobile] = useState()

    window.addEventListener('resize', ()=>{
            setWindow(window.innerWidth)
    })

    useEffect(()=>{
        setWindow(window.innerWidth)
        setIsMobile(window.clientInformation.userAgent.includes('Mobile'))
    }, [])

    if (win < 800 || isMobile) return <MobileLanding />

  return (
    <div className='page' id='landing'>
      <h1>Say world</h1>
    </div>
  )
}

export default Landing
