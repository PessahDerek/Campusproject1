import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button1 from '../Componets/Button1'
import Popup from '../Componets/Popup'
import Spinner from '../Componets/Spinner'
import { onApi } from '../Functions/Func1'

const AdminAuth = (props) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [login, setLogin] = useState(false)
    const [spin, setSpin] = useState(false)
    const [details, setDetails] = useState({
      username: "",
      phone: "",
      password: "",
      isManager: false,
    })

    const onsubmit = async(e) =>{
      e.preventDefault()
      setSpin(true)
      await axios.post(onApi+'/admincreateaccount', details)
      .then(res=>{
        if(res.data.err){
          setSpin(false)
          return setMessage(res.data.message)
        }
        setSpin(false)
        localStorage.setItem('currentAdmin', res.data.adminId)
        localStorage.setItem('isManager', res.data.isManager)
        props.setLoggedIn(res.data.adminId)
      })
      .catch(err=>{
        setMessage(err.message)
        setSpin(false)
      })
    }


  return (
    <div className='adminAuth'>
      {message && <Popup message={message} dismiss={setMessage} />}
      {spin && <Spinner />}
      <h1>Roasters' Digital Menu - Dashboard</h1>
      <h3>Welcome, Please login to proceed</h3>
  
      <form className='loginform' onSubmit={onsubmit}>
        <div>
          <label>Username</label>
          <input className='inp1'
            placeholder='username'
            value={details.username}
            onChange={e=>setDetails(p=>({...p, username: e.target.value}))}
          />
        </div>
        {!login && <div>
          <label>Phone </label>
          <input className='inp1'
            placeholder='Phone Number' 
            value={details.phone}
            onChange={e=>setDetails(p=>({...p, phone: e.target.value}))}
          />
        </div>}
        <div>
          <label>Password</label>
          <input className='inp1'
            placeholder='password'
            value={details.password}
            onChange={e=>setDetails(p=>({...p, password: e.target.value}))}
          />
        </div>
        {!login && <div>
          <label>I'm the Admin</label>
          <select className='inp1'
            value={details.isManager}
            onChange={e=>setDetails(p=>({...p, isManager: e.target.value}))}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>}
        <Button1 
          text={login ? "Login" : "Sign Up"}
          type="submit"
          func={function x(){/**do none */}}
        />
      </form>
        <span>
          <input type='checkbox' value={login} onChange={()=>setLogin(!login)} />
          <p>{login ? 'Uncheck to Sign Up' : 'Have an Account Already? Click to Login'}</p>
        </span>
        
    </div>
  )
}

export default AdminAuth
