import React from 'react'
import './admComp.css'
import { deleteTable } from '../../Functions/Func1'

const ViewTable = (props) => {

    const delete_Table = () =>{
      console.log(props.id)
      deleteTable(props.id, props.index)
    }
    
  return (
    <div className='viewTable'>
      <label>Table Number: </label>{props.num}
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
