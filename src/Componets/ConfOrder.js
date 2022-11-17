import React from 'react'
import './comp.css'
import { useDispatch } from 'react-redux'
import { remFromTray } from '../Store/store'

const ConfOrder = (props) => {
  const dispatch = useDispatch()
  let food = props.food

  return (
    <div className='confOrder'>
      <span className='buttons'>
        <h3>Food: {food.food}</h3>
        <h4>Cost: ksh{food.cost}</h4>
      </span>
      <span>
        <p className='label'>Comment: .</p>
        <p className='comment'>{food.comment}</p>  
      </span>
      
      <span className='buttons'>
        <button className='button1'
          onClick={()=>dispatch(remFromTray(props.id))}
        >
            Remove From Tray
        </button>
      </span>
      
      

    </div>
  )
}

export default ConfOrder
