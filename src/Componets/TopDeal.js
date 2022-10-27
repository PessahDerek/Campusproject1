import React from 'react'
import './comp.css'

const TopDeal = (props) => {
    let food = props.food
  return (
    <div className='topFood'>
      <div className='details'>
        <h1>Top Deal</h1>
        <h2>{food.title}</h2>
        <h2>Ksh.{food.prices[0].price}</h2>
        <button className='button3'
        >Get Deal</button>
      </div>
      <img src={food.image} alt='food' />
    </div>
  )
}

export default TopDeal
