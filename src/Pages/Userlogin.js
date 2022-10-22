import React, { useState } from 'react'
import './page.css'
import logo from '../Images/Icon1.png'
import Spinner from '../Componets/Spinner'

const Userlogin = (props) => {
    const [conf, setConf] = useState("")
    const [details, setDetails] = useState({
        username: "",
        phone: "", 
        password: ""
    })
  return (
    <div className='userLoginPage'>
      {<Spinner />}
      <img src={logo} alt="logo" />
      <h1>{props.isUser ? "Login" : "Sign Up"}</h1>
      <form className='userLoginForm'>
        <input 
            placeholder='`Username'
            value={details.username}
            onChange={e=>setDetails(p=>({...p, username: e.target.value}))}
        />
        {!props.isUser && <input 
            placeholder='Phone'
            value={details.phone}
            onChange={e=>setDetails(p=>({...p, phone: e.target.value}))}

        />}
        <input 
            placeholder='Password'
            value={details.password}
            onChange={e=>setDetails(p=>({...p, password: e.target.value}))}
        />
        {!props.isUser && <input 
            placeholder='Confirm'
            value={conf}
            onChange={e=>setConf(e.target.value)}
        />}
        <button className='btn1'>
            {props.isUser ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  )
}

export default Userlogin
