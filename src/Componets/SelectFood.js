import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './comp.css'

const SelectFood = (props) => {
    const navigate = useNavigate()
    let food = props.food
    let [Cheapest, setCheapest] = useState({constant: true, price: ""})

    useEffect(()=>{
        const cheap =()=>{
            let min = food.prices[0].price
            let max = 0
            let constant = 1
            for (const elem of food.prices){
                if (elem.price < min){
                    constant *= 0
                    min = elem.price;
                }
                if (elem.price > min && elem.price > max){
                    max = elem.price
                    constant *= 0
                }
            }
            if (constant===1){
                setCheapest({constant: true, price: min})
            }else{
                setCheapest({constant: false, min: min, max: max})
            }
        }
        cheap()
    }, [])
  return (
    <div className='selectFood'>
        <img src={food.image} alt='food' />
        <div className='details'>
            <h3>{food.title} </h3>
            <h4>{food.flavors.length} flavor{food.flavors.length > 1 ? "s" : ""} available</h4>
            {Cheapest.constant ? <h4>Price: Ksh.{Cheapest.price}</h4>
            : <div className='minMax'>
                <p>Min: Ksh.{Cheapest.min}</p>
                <p>Max: Ksh.{Cheapest.max}</p>
            </div>}
            <button className='button2'
                onClick={()=>navigate('./../setuporder', {state: {food: food}})}
            >Go to Order</button>
        </div>
    </div>
  )
}

export default SelectFood
