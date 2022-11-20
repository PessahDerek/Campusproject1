import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './comp.css'

const TrayBtn = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const tray = useSelector(state=>state.order_slice.order)
  let path = () => window.location.pathname

  // detect path change
  window.addEventListener('popstate', ()=>{
    if (path() === '/' || path().includes('admin') || path().includes("scan")){
      return setShow(false)
    }
    return setShow(true)
  })

  useEffect(()=>{
    if(path() === '/'|| path().includes('admin') || path().includes("scan")){
      return setShow(false)
    }
  }, [])
    
  return (
    <>
    {show && 
    <button className='trayBtn'
      onClick={()=>{
        if(path().includes('roasters/confirmorder'))return
        console.log("Yy")
        navigate('roasters/confirmorder')
      }}
    >
        <h2>{tray.length}</h2>
    </button>}
    </>
  )
}

export default TrayBtn
