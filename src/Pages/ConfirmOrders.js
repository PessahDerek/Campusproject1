import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ConfOrder from '../Componets/ConfOrder'
import './page.css'

const ConfirmOrders = () => {
  const [orderList, setOrderList] = useState([])
  let oList = useSelector(state=>state.order_slice.order)

  useEffect(()=>{
    setOrderList(oList)
  }, [oList])

  return (
    <div className='confirmOrderPage'>
      <nav className='nav3'>
        <h1>Your Tray</h1>
      </nav>
      <div className='listOrders'>
        {orderList.length < 1 && <h3 >You haven't added any food to your tray</h3>}
        
        {orderList.map(order=><ConfOrder 
            key={order.id}
            id={order.id}
            food={order.foods}
            comment={order.comment}
          />)
        }
      </div>
      <button className='button1' id='orderBtn'>
        Place order
      </button>
    </div>
  )
}

export default ConfirmOrders
