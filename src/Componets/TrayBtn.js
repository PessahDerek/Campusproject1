import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './comp.css'

const TrayBtn = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const tray = useSelector(state=>state.order_slice.order)

  useEffect(()=>{
    let path = window.location.pathname
    if(path === '/'){
      return setShow(false)
    }
  }, [])
    
  return (
    <>
    {show && 
    <button className='trayBtn'
      onClick={()=>navigate('roasters/confirmorder')}
    >
        <h2>{tray.length}</h2>
    </button>}
    </>
  )
}

export default TrayBtn
