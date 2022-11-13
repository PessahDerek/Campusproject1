import React, { useEffect } from 'react'
import './comp.css'

const Popup = (props) => {
    
    useEffect(()=>{
        setTimeout(()=>{
            props.dismiss("")
        }, 4000)
    }, [props])

  return (
    <div className='popup' id='popup'>
        <h3>Notification</h3>
        {props.message}
    </div>
  )
}

export default Popup
