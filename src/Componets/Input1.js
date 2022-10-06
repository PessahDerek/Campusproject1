import React from 'react'
import './comp.css'

const Input1 = (props) => {
  return (
    <input 
        type={props.type !== null ? "text": `${props.type}`}
        value={props.value}
        onChange={e=>props.onChange(e.target.value)}
    />
  )
}

export default Input1
