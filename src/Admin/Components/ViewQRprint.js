import React from 'react'
import './admComp.css'

const ViewQRprint = (props) => {
  return (
    <div className='viewQRprint' style={{
        backgroundColor: `${props.printed ? "gray" : "pink"}`
    }}>
      <label>Table Number: {props.num}</label>
      <img src={props.qrImage} alt="qr" />
    </div>
  )
}

export default ViewQRprint
