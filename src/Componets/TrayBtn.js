import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './comp.css'

const TrayBtn = () => {
  const navigate = useNavigate()
    const tray = useSelector(state=>state.order_slice.order)
  return (
    <button className='trayBtn'
      onClick={()=>navigate('roasters/confirmorder')}
    >
        <h2>{tray.length}</h2>
    </button>
  )
}

export default TrayBtn
