import React from 'react'
import './admComp.css'
import { deleteTable } from '../../Functions/Func1'
import QRCode from 'react-qr-code';

const ViewTable = (props) => {
  const delete_Table = () =>{
    props.delete(props.id)
  }
    
  return (
    <div className='viewTable'>
      <label>Table Number: {props.num}</label>
      <img src={props.qrCode} alt='qrcode' />
      <div className='btns'>
        <button className='button2'>
          View Table
        </button>
        <button className='delBtn' onClick={delete_Table}>Delete Table</button>
      </div>
      
    </div>
  )
}

export default ViewTable
