import React from 'react'
import './comp.css'
import { generateId } from '../Functions/Func1'
import { useDispatch } from 'react-redux'
import { remFromTray } from '../Store/store'

const ConfOrder = (props) => {
  const dispatch = useDispatch()
  let food = props.food
  
  return (
    <div className='confOrder'>
      <span>
        <h3>Food: {food[0].food}</h3>
      </span>
      <span>
        <p className='label'>Flavor </p>
        <p className='label'>size </p> 
        <p className='label'>quantity: </p>
        <p className='label'>total: </p>
      </span>
      {food.map(flav=><span key={generateId()}>
        <p>{flav.flavor}</p>
        <p>{flav.size}</p>
        <p>{flav.quantity}</p>
        <p>{flav.cost}</p>
      </span>)}
      <span>
        <p className='label'>Comment: .</p>
        <p className='comment'>{props.comment}</p>  
      </span>
      
      <span className='buttons'>
        <button className='button1'
          onClick={()=>dispatch(remFromTray(props.id))}
        >
            Remove From Tray
        </button>
        <button className='button1'>
            Edit
        </button>
      </span>
      
      

    </div>
  )
}

export default ConfOrder
