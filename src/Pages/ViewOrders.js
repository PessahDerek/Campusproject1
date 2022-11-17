import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Myorder from '../Componets/Myorder'
import Navbar from '../Componets/Navbar'
import { onApi } from '../Functions/Func1'

const ViewOrders = () => {
  const [myorders, setOrder] = useState([])
  const [message, setMessage] = useState("")
  let userId = localStorage.getItem('roastersUser')

  const getOrders = async()=>{
    try {
      await axios.post(onApi+'/myorders', {userId: userId})
      .then(res=>{
        if(res.data.err){
          return
        }
        setOrder(res.data.orders)
      }, err=>{
        setMessage(err.message)
      })
    } catch (error) {
      
    }
    
  }
  useEffect(()=>{
    getOrders()
  }, [])

  if(myorders.length < 1) return (
    <div>
      <Navbar />
      <div className='errorDiv'>
        {!message && <h1>You dont seem to be waiting for any order</h1>}
        {message && <h1>{message}</h1>}
        <button className='button4'>
          Refresh
        </button>
      </div>
      
    </div>
  )
  return (
    <div className='viewOrdersPage'>
      <Navbar />
      <div className='myOrderList'>
        {myorders.map(myorder=><Myorder 
          key={myorder._id}
          orders={myorder.orders}
          total={myorder}
        />)}
      </div>  
    </div>
  )
}

export default ViewOrders
