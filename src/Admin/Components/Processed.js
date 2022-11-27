import axios from 'axios'
import './admComp.css'
import React, { useEffect, useState } from 'react'
import { onApi } from '../../Functions/Func1'

const Processed = (props) => {
    const [customer, setCustomer] = useState("")
    useEffect(()=>{
        async function getusers(){
            await axios.post(onApi+'/finduser', {userId: props.userId})
            .then(res=>{
              if(res.data.err){
                return
              }
              setCustomer(res.data.user)
            }, err=>setCustomer(p=>({...p, username: err.message})))
            .catch(err=>{
              // ignore
            })
        }
        getusers()
    })
  return (
    <div className='processed'>
      <span>
        <h5>Table number: {props.tbNumber}</h5>
        <h5>Customer: {customer.username}</h5>
      </span>
      {props.orders.map(order=><span className='food'
       key={order.id}>
        <h4>{order.food}</h4>
        <p>{order.comment}</p>
      </span>)}
    </div>
  )
}

export default Processed
