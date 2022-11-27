import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Popup from '../../Componets/Popup'
import Spinner from '../../Componets/Spinner'
import { onApi } from '../../Functions/Func1'
import "./admComp.css"

const Order = (props) => {
    const [reason, setReason]=useState("")
    const [response, setResp]=useState(false)
    const [customer, setCustomer] = useState({username: "John Doe"})
    const [message, setMessage] = useState("")
    const [spin, setSpin] = useState(false)

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
    }, [])

    const processOrder = async() =>{
      setSpin(true)
      await axios.post(onApi+'/processorder', {
        orderId: props.orderId
      })
      .then(res=>{
        if(res.data.err)return setMessage(res.data.message)
        return props.refresh()
      }, err=>{
        setMessage(err.message)
      })
      .catch(err=>{
        setMessage(err.message)
      })
      .finally(
        setSpin(false)
      )
    }
  return (
    <div className='order'>
      {spin && <Spinner />}
      {message && <Popup message={message} dismiss={setMessage} />}
      <span>
        <h5>Table number: {props.tbNumber}</h5>
        <h5>Customer: {customer.username}</h5>
      </span>
      {props.orders.map(order=><span className='food'
       key={order.id}>
        <h4>{order.food}</h4>
        <p>{order.comment}</p>
      </span>)}
      <button className='simpleblack'
        onClick={processOrder}
      >
        Confirm
      </button>
      <button className='button1'>
        Deny
      </button>
      <div className='reason'>

      </div>
    </div>
  )
}

export default Order
