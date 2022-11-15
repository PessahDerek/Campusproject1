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
    const [spin, setSpin] = useState(false)
    const [details, setDetails] = useState({
      username: "",
      phone: '0741120439',
      password: ""
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
        props.setLoggedIn(res.data.adminId)
      })
    }


  return (
    <div className='adminAuth'>
      {message && <Popup message={message} dismiss={setMessage} />}
      {spin && <Spinner />}
      <h1 className='cuteH1'>Servy, Roasters' Digital Menu - Dashboard</h1>
      <h1>Welcome, Please login to proceed</h1>

      <form className='loginform' onSubmit={onsubmit}>

        <div>
          <label>Username</label>
          <input className='inp1'
            placeholder='username'
            value={details.username}
            onChange={e=>setDetails(p=>({...p, username: e.target.value}))}
          />
        </div>
        <div>
          <label>Password</label>
          <input className='inp1'
            placeholder='password'
            value={details.password}
            onChange={e=>setDetails(p=>({...p, password: e.target.value}))}
          />
        </div>
        <Button1 
          text="Login"
          type="submit"
          func={function x(){/**do none */}}
        />
      </form>
    </div>
  )
}

export default AdminAuth
