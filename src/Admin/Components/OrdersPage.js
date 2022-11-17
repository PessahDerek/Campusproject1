import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../../Componets/Spinner'
import { onApi } from '../../Functions/Func1'
import './admComp.css'
import Order from './Order'

const OrdersPage = () => {
  const [spin, setSpin] = useState(false)
  const [message, setMessage] = useState("")
  const [orders, setOrders] = useState([])

  async function getOrders(){
    setSpin(true)
      await axios.get(onApi+'/fetchorders')
      .then(res=>{
        if(res.data.err){
          setMessage("Could Not add")
          setSpin(false)
        }
        setOrders(res.data.orders)
        setSpin(false)
      }, err=>{
        setMessage(err.message)
        setSpin(false)
      })
      .catch(err=>{
        setMessage(err.message)
        setSpin(false)
      })
    }

  useEffect(()=>{
    getOrders()
  }, [])
  return (
    <div className='ordersPage'>
      <section>
        {spin && <Spinner />}
        <nav>
          <h1>Pending Orders({orders.length})</h1>
          <button className='button4' onClick={getOrders}>
            Refresh
          </button>
        </nav>
        {orders.length < 1 && <h3>No Pending Orders</h3>}
        {orders.length > 0 && 
        orders.map(order=><Order 
          key={order._id}
          userId={order.customer}
          tbNumber={order.tableNumber}
          orders={order.orders}
        />)
        }
      </section>
      
    </div>
  )
}

export default OrdersPage
