import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '../../Componets/Popup'
import Spinner from '../../Componets/Spinner'
import { onApi } from '../../Functions/Func1'
import { get_Orders } from '../../Store/store'
import './admComp.css'
import Order from './Order'
import Processed from './Processed'

const OrdersPage = () => {
  const dispatch = useDispatch()
  const [spin, setSpin] = useState(false)
  const [message, setMessage] = useState("")
  const orders = useSelector(state=>state.admin.orders)

  async function getOrders(){
    setSpin(true)
      await axios.get(onApi+'/fetchorders')
      .then(res=>{
        if(res.data.err){
          setMessage("Could Not Fetch Orders")
          setSpin(false)
        }
        dispatch(get_Orders(res.data.orders))
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
        {message && <Popup message={message} dismiss={setMessage} />}
        <nav>
          <h1>Pending Orders({orders.length})</h1>
          <button className='button4' onClick={getOrders}>
            Refresh
          </button>
        </nav>
        <div className='ordersList'>
          {orders.length < 1 && <h3>No Pending Orders</h3>}
          {orders.length > 0 && 
            orders.map(order=>{
              if(!order.processed) return <Order 
              key={order._id}
              orderId={order._id}
              userId={order.customer}
              refresh={getOrders}
              tbNumber={order.tableNumber}
              orders={order.orders}
            />})
          }
        </div>
      </section>
      <section>
        <nav>
          <h1>Processed({orders.filter(p=>p.processed).length}/{orders.length})</h1>
          <button className='button4' onClick={getOrders}>
            Refresh
          </button>
        </nav>
        <div className='ordersList'>
        {orders.filter(p=>p.processed).map(order=><Processed 
              key={order._id}
              userId={order.customer}
              tbNumber={order.tableNumber}
              orders={order.orders}
            />)
          }
        </div>
      </section>
    </div>
  )
}

export default OrdersPage
