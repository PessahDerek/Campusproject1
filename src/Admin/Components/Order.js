import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { onApi } from '../../Functions/Func1'
import "./admComp.css"

const Order = (props) => {
    const [reason, setReason]=useState("")
    const [response, setResp]=useState(false)
    const [customer, setCustomer] = useState({username: "Doe"})

    useEffect(()=>{
      async function getusers(){
        await axios.post(onApi+'/finduser', {userId: props.userId})
        .then(res=>{
          if(res.data.err){
            // ignore
          }
          setCustomer(res.data.user)
        }, err=>setCustomer(p=>({...p, username: err.message})))
        .catch(err=>{
          // ignore
        })
      }
      
    })
  return (
    <div className='order'>
      <span>
        <h5>Table number: {props.tbNumber}</h5>
        <h5>Customer: {customer.username}</h5>
      </span>
      {props.orders.map(order=><span key={order.id}>
        <h6>{order.title}</h6>
        <h6>{}</h6>
      </span>)}
    </div>
  )
}

export default Order
