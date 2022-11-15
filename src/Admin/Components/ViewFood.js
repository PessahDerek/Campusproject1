import axios from 'axios';
import React, { useState } from 'react'
import Popup from '../../Componets/Popup';
import { onApi } from '../../Functions/Func1';
import './admComp.css'

const ViewFood = (props) => {
    let rating = ["⭐","⭐","⭐","⭐","⭐"];
    let food = props.food;

    const [readOnly, setReadOnly] = useState(true)
    const [message, setMessage] = useState("")
    const [details, setDetails] = useState({
      id: food._id,
      title: food.title,
      description: food.description,
      price: food.price 
    })

    const save = async() =>{
      axios.post(onApi+'/editfood', details)
      .then(res=>{
        if(res.data.err) return setMessage(res.data.message)
        setMessage(res.data.message)
      }, err=>{
        setMessage(err.message)
      })
      .catch(err=>{
        setMessage(err.message)
      })
    }
  return (
    <div className='viewFood'>
        <img src={food.image} alt="food" />
     <div>
        {message && <Popup message={message} dismiss={setMessage} />}
        <span>
            <input id='header' value={
              details.title === food.title ? food.title : details.title
            }
              readOnly={readOnly}
              onChange={e=>setDetails(p=>({...p, title: e.target.value}))}
            />
            <h6>{food.rating ? rating.splice(0, food.rating) : "0 rating"}</h6>
        </span>
        <textarea value={readOnly ? food.description : details.description}
          readOnly={readOnly}
          onChange={e=>setDetails(p=>({...p, description: e.target.value}))}
        />
        <span>
          <label>Price:</label>
          <input className='inp2'
            value={food.price === details.price ? food.price : details.price}
            onChange={e=>setDetails(p=>({...p, price: e.target.value}))}
            readOnly={readOnly}
          />
        </span>
        <span>
            <button className='button1' 
              onClick={()=>{
                if(!readOnly)save()
                setReadOnly(!readOnly)
              }}
            >
              {readOnly ? "Edit" : "Save"}
            </button>
            <button className='simpleblack'>
                Remove
            </button>
        </span>
     </div>
    </div>
  )
}

export default ViewFood
