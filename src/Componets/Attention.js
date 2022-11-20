import React, { useState } from 'react'
import axios from 'axios'
import {onApi} from '../Functions/Func1'
import Spinner from './Spinner'
import Popup from './Popup'
import { useSelector } from 'react-redux'

const Attention = () => {
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [spin, setSpin] = useState(false)
  const tbNumber = useSelector(state=>state.order_slice.tableNumber)

  const sendRequest = async() =>{
    if(!tbNumber)return setErrMsg("Scan table to proceed")
    
    setSpin(true)
    let body = {
      customer: localStorage.getItem('roastersUser'),
      tableNumber: tbNumber,
      message: message
    }
    await axios.post(onApi+'/custrequest', body)
    .then(res=>{
      if(res.data.err){
        setSpin(false)
        return setErrMsg(res.data.message)
      }
      setSpin(false)
        setSent(res.data.sent)
        setTimeout(() => {
          return setClicked(false)
        }, 1000);
    }, err=>{
      setSpin(false)
      setErrMsg(err.message)
    })
  }

  const style = {
    left: `${clicked? '10vw' : '-90vw'}`,
    opacity: `${clicked ? '1' : '0'}`,
    top: `${clicked ? '30vh' : '10vh'}`

  }
  return (
    <div className='attention'>
      {spin && <Spinner />}
      {errMsg  && <Popup message={errMsg} dismiss={setErrMsg} />}
      <button className='trayBtn' 
        onClick={()=>setClicked(!clicked)}
      />
      <div id='attentionDetails' style={style} onBlur={()=>setClicked(false)}>
        <h2>Request for attendant</h2>
        <textarea 
          placeholder='Write any message you have here'
          value={message}
          onChange={e=>setMessage(e.target.value)}
        />
        <button className='button1'
          onClick={sendRequest}
        >
          {sent ? 'Waiting' : 'Send request'}
        </button>
      </div>
    </div>
  )
}

export default Attention
