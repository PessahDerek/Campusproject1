import React, { useEffect, useState } from 'react'
import './page.css'
import logo from '../Images/Icon1.png'
import Spinner from '../Componets/Spinner'
import axios from 'axios'
import { onApi } from '../Functions/Func1'
import Popup from '../Componets/Popup'
import { useNavigate } from 'react-router-dom'

const Userlogin = (props) => {
  let [isUser, setIsUser] = useState("")
  const navigate = useNavigate()
  const [conf, setConf] = useState("")
  const [spin, setSpin] = useState(false)
  const [message, setMessage] = useState("")
  const [details, setDetails] = useState({
      username: "",
      phone: "", 
      password: ""
  })

  useEffect(()=>{
    setIsUser(props.isUser)
  }, [props.isUser])

    const loginSignUp = async(e) =>{
      e.preventDefault()
      if(!isUser)if(conf !== details.password){
        setMessage("Password Mismatch!!")
        return 
      } 
      setMessage("")
      setSpin(true)
      let path = isUser ?  '/login' : '/createaccount'
      await axios.post(onApi+path, details)
      .then(res=>{
        if(res.data.err){
          setMessage(res.data.message)
          return setSpin(false)
        }
        
        localStorage.setItem('roastersUser', res.data.userId)
        console.log(localStorage.getItem('roastersUser'))
        setSpin(false)
        navigate('/scanpage')
        // props.setIsUser(true)
      }, err=>{
        setSpin(false)
        setMessage(err.message)
      })
      .catch(err=>{
        setSpin(false)
        setMessage(err.message)
      })

    }

  return (
    <div className='userLoginPage'>
      {message && <Popup message={message} dismiss={setMessage} />}
      {spin && <Spinner />}
      <img src={logo} alt="logo" className='icon' />

      <h1>{props.isUser ? "Login" : "Sign Up"}</h1>

      <form className='userLoginForm' onSubmit={loginSignUp}>
        <input 
            placeholder='Username'
            value={details.username}
            onChange={e=>setDetails(p=>({...p, username: e.target.value}))}
        />
        {!isUser && <input 
            placeholder='Phone'
            value={details.phone}
            onChange={e=>setDetails(p=>({...p, phone: e.target.value}))}

        />}
        <input 
            placeholder='Password'
            value={details.password}
            onChange={e=>setDetails(p=>({...p, password: e.target.value}))}
        />
        {!isUser && <input 
            placeholder='Confirm'
            value={conf}
            onChange={e=>setConf(e.target.value)}
        />}
        <button className='btn1'>
            {isUser ? "Login" : "Sign Up"}
        </button>
        <button className='linkBtn'
          type='button'
          color='white'
          onClick={()=>setIsUser(!isUser)}
        >
          {isUser ? "Sign Up " : "Login "} instead?
        </button>
      </form>
    </div>
  )
}

export default Userlogin
