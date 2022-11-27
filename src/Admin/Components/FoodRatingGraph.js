import React, { useState } from 'react'
import './admComp.css'
import { useSelector } from 'react-redux'

const FoodRatingGraph = () => {
  const [sortVal, setVal] = useState("")
    let foods = useSelector(state=>state.admin.foods)

  return (
    <div className='foodRatingGraph'>
        <div className='x'>
          <h1>Star Groups</h1>
          <div className='header'>
            <span>
              <label>5 Stars: </label>
              <p>{foods.filter(f=>f.rating > 4.9).length}/{foods.length}</p>
            </span>
            <span>
              <label>4 Stars:</label>
              <p>{foods.filter(f=>f.rating < 5 && f.rating > 3.9).length}/{foods.length}</p>
            </span>
            <span>
              <label>3 Stars: </label>
              <p>{foods.filter(f=>f.rating < 4 && f.rating > 2.9).length}/{foods.length}</p>
            </span>
            <span>
              <label>2 Stars: </label>
              <p>{foods.filter(f=>f.rating < 3 && f.rating > 1.9).length}/{foods.length}</p>
            </span>
            <span>
              <label>1 Star: </label>
              <p>{foods.filter(f=>f.rating < 2 && f.rating > 0).length}/{foods.length}</p>
            </span>
            <span>
              <label>Not Rated: </label>
              <p>{foods.filter(f=>f.rating === 0).length}/{foods.length}</p>
            </span>
          </div>
          <input placeholder='Sort By Star Number' value={sortVal} onChange={
            e=>setVal(e.target.value)
          } />
          {sortVal.length > 0 && !isNaN(Number(sortVal)) && foods.filter(f=>f.rating.toString().includes(sortVal)).map(food=><p key={food._id}>
            {food.title}{food.rating.toFixed(2)}
          </p>)}

          {sortVal.length > 0 && isNaN(sortVal) && foods.filter(f=>f.title.toLowerCase().includes(sortVal.toLowerCase())).map(food=><p key={food._id}>
            {food.title}({food.rating.toFixed(2)})
          </p>)}
        </div>
      <div className='foodRating'>
        <h1>Food Ratings</h1>
        {foods.map(food=><span key={food._id}>
            <label>{food.title}</label>
            <div style={{
                background: `linear-gradient(90deg, #9E54FF ${(food.rating/5)*100}% , white ${0}%)`
            }}>{food.rating.toFixed(1)} Stars</div>
        </span>)}
      </div>
    </div>
  )
}

export default FoodRatingGraph
