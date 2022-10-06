import React from 'react'
import './comp.css'
import { useNavigate } from 'react-router-dom'

const Button1 = (props) => {
    const navigate = useNavigate()

    const onClick = () =>{
        if (props.path){
            navigate(props.path, {state: {state: props.state}})
            return
        }
        props.func()
    }
  return (
    <button className='btn1' onClick={onClick} type={props.type ? `${props.type}`: "button"}>
        {props.text}
    </button>
  )
}

export default Button1
