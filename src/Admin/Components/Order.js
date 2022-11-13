import React, {useState} from 'react'
import "./admComp.css"

const Order = (props) => {
    const [reason, setReason]=useState("")
    const [response, setResp]=useState(false)
    
  return (
    <div className='order'>
      <span>Table: {props.number}</span>
      <label>Food</label>
      <div className='foods'>
        {/* list foods */}

      </div>
      <textarea 
        value={props.extras}
        readOnly
      />
        <button className="button2">
            Process
        </button>
        <button className="button2" onClick={()=>setResp(!response)}>
            Respond
        </button>
        {response && <div className='response'>
            <textarea 
                value={reason}
                onChange={e=>setReason(e.target.value)}
            />
            <div className='btns'>
                <button className="button1">
                    Send
                </button>
                <button className="button1" onClick={()=>setResp(false)}>
                    Cancel
                </button>
            </div>
            
        </div>}
    </div>
  )
}

export default Order
