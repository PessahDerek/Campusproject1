import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { onApi } from '../../Functions/Func1'
import './admComp.css'
import Order from './Order'

const OrdersPage = () => {
  const [spin, setSpin] = useState(false)
  const [message, setMessage] = useState("")
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    async function getOrders(){
      await axios.get(onApi+'/fetchorders')
      .then(res=>{
        if(res.data.err){
          
        }
      })
    }
  })
  return (
    <div className='ordersPage'>
      <section>
        <nav>
          <h1>Pending Orders</h1>
          <h1>{orders.length}</h1>
        </nav>
        {orders.length < 1 && <h3>No Pending Orders</h3>}
        {orders.length > 0 && 
        orders.map()
        }
        <Order />
      </section>
      
    </div>
  )
}

export default OrdersPage
