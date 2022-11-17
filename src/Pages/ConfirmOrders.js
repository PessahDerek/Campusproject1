import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ConfOrder from '../Componets/ConfOrder'
import Popup from '../Componets/Popup'
import Spinner from '../Componets/Spinner'
import { onApi } from '../Functions/Func1'
import { addPendingOrder } from '../Store/store'
import './page.css'

const ConfirmOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [orderList, setOrderList] = useState([])
  const [spin, setSpin] = useState(false)
  const [message, setMessage] = useState("")
  let oList = useSelector(state=>state.order_slice.order)
  const [total, setTotal] = useState(0)

  useEffect(()=>{
    setOrderList(oList)
    let tot = 0
    oList.forEach(p=>{
      console.log(p.cost)
      tot+=p.cost
    })
    setTotal(tot)
  }, [oList])


  const place_order = async() =>{
    // get user id
    let userId = localStorage.getItem('roastersUser')
    // get table number

    let sendObject = {
      userId: userId,
      tableNumber: "",
      orders: orderList
    }
    setSpin(true)

    await axios.post(onApi+'/placeorder', sendObject)
    .then(res=>{
      if(res.data.err){
        return setMessage(res.data.message)
      }
      dispatch(addPendingOrder(res.data.orderId))
      setMessage(res.data.message)
      setTimeout(() => {
        navigate('/yourorders')
      }, 4000);
    }, err=>{
      // minor
      setMessage(err.message)
      setSpin(false)
    })
    .catch(err=>{
      // error
      setMessage(err.message)
    })

  }

  return (
    <div className='confirmOrderPage'>
      {message && <Popup message={message} dismiss={setMessage} />}
      {spin && <Spinner />}
      <nav className='nav3'>
        <h1>Your Tray</h1>
        <h1>Total: Ksh.{total}</h1>
      </nav>
      <div className='listOrders'>
        {orderList.length < 1 && <h3 >You haven't added any food to your tray</h3>}
        
        {oList.map(order=><ConfOrder 
            key={order.id}
            id={order.id}
            food={order}
            comment={order.comment}
          />)
        }
      </div>
      <button className='button1' id='orderBtn'
        onClick={place_order}
      >
        Place order
      </button>
    </div>
  )
}

export default ConfirmOrders
