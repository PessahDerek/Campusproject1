import React from 'react'

const ReadFoodFB = (props) => {
  return (
    <div style={{
        height: 'max-content',
        minHeight: '3em',
        paddingLeft: "2%",
        paddingRight: "2%",
    }}>{props.comment}</div>
  )
}

export default ReadFoodFB
