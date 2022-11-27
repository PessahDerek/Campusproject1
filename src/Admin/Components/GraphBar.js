import React, { useLayoutEffect } from 'react'

const GraphBar = (props) => {
  let height = props.getHeight(props.food._id)

  useLayoutEffect(()=>{
    let x = document.getElementById(`${props.food._id}`)
  })
  return (
    <div className='graphBar'> 
      <div style={{
        height: `${height}%`,
        backgroundColor: `${height < 20 ? "rgb(253, 69, 2)" : "#9E54FF"}`
      }}>
      </div>
        <p id={`${props.food._id}`}>{props.food.title+` ${!isNaN(height)&&height.toFixed(2)}`} %</p>
    </div>
  )
}

export default GraphBar
