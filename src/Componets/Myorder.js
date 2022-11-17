import React from 'react'
import Rate from './Rate'

const Myorder = (props) => {
    
  return (
    <div className='myOrder'>
        {props.orders.map(order=><span className='food'
        key={order.id}>
            <span className='hor'>
              <h4>{order.food}</h4>  
              <Rate food={order.food} 
                id={order.id}
              />
            </span>
            
            <p>{order.comment ? order.comment : "You had no comment or special instructions..."}</p>
        </span>)}
        <span>
            <h3>Total: </h3>
        </span>
    </div>
  )
}

export default Myorder
