import React, { useState } from 'react'
import Button1 from '../Componets/Button1'

const AdminAuth = (props) => {
    const [details, setDetails] = useState({
      username: "",
      password: ""
    })

    const onsubmit = (e) =>{
      e.preventDefault()
      localStorage.setItem("isLogged", true)
    }
  return (
    <div className='adminAuth'>

      <h1 className='cuteH1'>Servy, Roasters' Digital Menu - Dashboard</h1>
      <h1>Welcome, Please login to proceed</h1>

      <form className='loginform' onSubmit={onsubmit}>

        <div>
          <label>Username</label>
          <input className='inp1'
            placeholder='username'
          />
        </div>
        <div>
          <label>Password</label>
          <input className='inp1'
            placeholder='password'
          />
        </div>
        <Button1 
          text="Login"
          type="submit"
        />
      </form>
    </div>
  )
}

export default AdminAuth
