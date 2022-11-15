import React, { useState } from 'react'

const Attention = () => {
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [clicked, setClicked] = useState(false)

  const show = (e) =>{
    let widget = document.querySelector(".attention .details")
    if(clicked){
      widget.style.left = "-80vw"
      widget.style.opacity = '0'
      e.target.style.background = "url('./Images/notificationOutlineWhite.png') #FF9E0D;"
      return setClicked(false)
    }
    widget.style.left = '15vw'
    widget.style.opacity = '1' 
    e.target.style.background = "url('./Images/notificationOutlineWhite.png') #ff0d0d;"
    setClicked(true)
  }

  return (
    <div className='attention'>
      <button className='trayBtn' 
        onClick={show}
      />
      <div className='details'>
        <h3>Request for attendant</h3>
        <textarea 
          placeholder='Write any message you have here'
          value={message}
          onChange={e=>setMessage(e.target.value)}
        />
        <button className='button1'>
          {sent ? 'Waiting' : 'Request'}
        </button>
      </div>
    </div>
  )
}

export default Attention
