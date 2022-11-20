import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToTray, remFromTray } from '../Store/store'
import Attention from './Attention'
import './comp.css'
import TrayBtn from './TrayBtn'

const SelectFood = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const added = useRef(false)
    const [wasAdded, setAdded] = useState(false)
    const [comment, setComment] = useState("")
    let food = props.food
    const [clicked, setClicked] = useState(false)
    const [qty, setQty] = useState(1)

    useEffect(()=>{
        setAdded(added.current)
    }, [])

    const add_To_Tray = (e, add) =>{
        let widg = document.getElementById(`${food._id}`)
        if(added.current){
            added.current = false
            return dispatch(remFromTray(food._id))
        }
        added.current = true
        widg.style.top = '50%'
        widg.style.opacity = '0'
        widg.style.left = '-100%'
        return dispatch(addToTray({id: food._id, food: food.title, qty: qty, cost: food.price * qty, comment: comment}))
    }

    const handleSelect = (e, add) =>{
        let widg = document.getElementById(`${food._id}`)
        if(clicked){
            widg.style.top = '50%'
            widg.style.opacity = '0'
            widg.style.left = '-100%'
            if(added.current && !add){
               dispatch(remFromTray(food._id)) 
               added.current = false
            } 
            return setClicked(false)
        }
        widg.style.top = '100%'
        widg.style.opacity = '1'
        widg.style.left = "0"
        setClicked(true)
        if(added.current){
            console.log('xxx')
            added.current = false
            return dispatch(remFromTray(food._id))
        }
        console.log(add)
        if(!added.current && add === true){
            added.current = true
            setClicked(true)
            return dispatch(addToTray(food))
        }
    }
  return (
    <div className='selectFood'>
        <img src={food.image} alt='food' />
        <div className='details'>
            <h3>{food.title} </h3>
            <article>
                <p>{food.description}</p>
            </article>
            <span>
                <p>Price:</p>
                <p>Ksh.{food.price}</p>
            </span>
            <span>
                <p>Qty: </p>
                <input min={1} value={qty} 
                onBlur={()=>{
                    if(qty < 1 || isNaN(qty))setQty(1)
                }}
                onChange={e=>{
                    setQty(e.target.value)
                }}
                    type='number'
                />
            </span>
            <button className='button2'
                onClick={e=>handleSelect(e, false)}
            >{wasAdded ? "remove" : "Add to Tray"}</button>
        </div>
        <div className='setUpOrder' id={`${food._id}`}>
            <h3>{food.title} (cost: {food.price * qty})</h3>
            <textarea 
                placeholder="Add any instruction, comment or flavor"
                value={comment}
                onChange={e=>setComment(e.target.value)}
            />
            <span>
                <button className='button1'
                    onClick={(e)=>{
                        add_To_Tray(e, )
                    }}
                >{added.current ? "Remove" : "Add To Tray"}</button>
                <button className='button1'
                    onClick={e=>handleSelect(e,)}
                >Cancel</button>
            </span>
            
        </div>
    </div>
  )
}

export default SelectFood
