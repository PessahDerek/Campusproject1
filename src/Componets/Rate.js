import axios from 'axios'
import React, { useState } from 'react'
import { onApi } from '../Functions/Func1'
import Ratebtn from './Ratebtn'
import Spinner from './Spinner'

const Rate = (props) => {
    const [show, setShow] = useState(false)
    const [total, setTotal] = useState(0)
    const [spin, setSpin] = useState(false)
    const [rate, setRate] = useState({
        foodId: props.id,
        stars: 0,
        feedback: ""
    })
    const setClick = (val) =>{
        setTotal(val)
        setRate(p=>({...p, stars: val}))
        return total
    }

    const sendFeedBack = async() =>{
        setSpin(true)
        await axios.post(onApi+'/customerfeedback', rate)
        .then(res=>{
            if(res.data.err){
                setSpin(false)
                return alert(res.data.message)
            }
            setSpin(false)
            alert(res.data.message)
        }, err=>{
            alert(err.message)
            setSpin(false)
        })
        .catch(err=>{
            setSpin(false)

        })
        setShow(false)
    }

  return (
    <div className='ratingWidget'>
        {spin && <Spinner />}
      <div className='rate' onClick={()=>setShow(!show)}>
        <Ratebtn id={1} isTrue={setClick} tot={total} 
            show={setShow} setRate={setRate}
        />
        <Ratebtn id={2} isTrue={setClick} tot={total} 
            show={setShow} setRate={setRate}
        />
        <Ratebtn id={3} isTrue={setClick} tot={total} 
            show={setShow} setRate={setRate}
        />
        <Ratebtn id={4} isTrue={setClick} tot={total} 
            show={setShow} setRate={setRate}
        />
        <Ratebtn id={5} isTrue={setClick} tot={total} 
            show={setShow} setRate={setRate}
        />
      </div>
      {show &&
      <div className='feedback' onBlur={()=>setShow(false)}>
        <h3>Share your thoughts</h3>
        <textarea 
            placeholder={total < 3 ? `What about our ${props.food} don't you like? Any tips?`: `Thank you, is there anything we can improve on?`}
            value={rate.feedback}
            onChange={e=>setRate(p=>({...p, feedback: e.target.value}))}
        />
        <span>
            <button className='button1'
                onClick={sendFeedBack}
            >
                Send feedback
            </button>
            <button className='simpleblack'
                onClick={()=>setShow(false)}
            >
                Cancel
            </button>
        </span>
        
      </div>
      }
    </div>
  )
}

export default Rate
