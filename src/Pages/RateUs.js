import React, { useState } from 'react'
import Navbar from '../Componets/Navbar'
import './page.css'
import { FiSend } from 'react-icons/fi'
import Spinner from '../Componets/Spinner'
import Popup from '../Componets/Popup'
import axios from 'axios'
import { onApi } from '../Functions/Func1'

const RateUs = () => {
  const [feedback, setFeedback] = useState("")
  const [spin, setSpin] = useState(false)
  const [message, setMessage] = useState("")

  const sendFeedback = async e =>{
    e.preventDefault()
    if(!feedback)return setMessage("Write Something")
    setSpin(true)
    
    await axios.post(onApi+"/customerfeedback", {feedback: feedback})
    .then(res=>{
      if(res.data.err){
        setMessage(res.data.message)
        return setSpin(false)
      }
      setMessage(res.data.message)
      return setSpin(false)
    }, err=>{
      setMessage(err.message)
      setSpin(false)
    })
    .catch(err=>{
      setMessage(err.message)
      setSpin(false)
    })
  }

  return (
    <div className='rateUsPage'>
      <Navbar />
      <h1>We appreciate your feedback</h1>
      <em>We'll use it to do better</em>
      {spin && <Spinner />}
      {message && <Popup message={message} dismiss={setMessage} />}

      <form onSubmit={sendFeedback} >
        <textarea 
          placeholder='Tell us what you think about our service...'
          value={feedback}
          onChange={e=>setFeedback(e.target.value)}
        />
        <button className='simpleblack'>
          {<FiSend />}Send
        </button>
      </form>

    </div>
  )
}

export default RateUs
