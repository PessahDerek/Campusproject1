import React from 'react'
import { useNavigate } from 'react-router-dom'
import './admComp.css'

const AdminNav = (props) => {
  const navigate = useNavigate()

  const toPath = (path) =>{
    switch(path){
      case '/orders': {
        console.log("hello")
        navigate('.')
        break;
      }
      case '/attention': {
        navigate('attention')
        break;
      }
      case '/menu': {
        navigate('menu')
        break;
      }
      case '/tables': {
        navigate('setuprestaurant')
        break;
      }
      case '/analytics': {
        navigate('analytics')
        break;
      }
      default: {
        navigate('setttings');
        break;
      }
    }
  }
  return (
    <nav className='adminNav'>
        <h1 className='cuteH1'>Servy</h1>

        <div>
            <button onClick={
              ()=>toPath('/orders')
            }>Orders: {props.orderNotif}</button>

            <button>Attention: {props.attentNotif}</button>

            <button onClick={
              ()=>toPath('/menu')
            }>Menu</button>

            <button onClick={
              ()=>toPath('/tables')
            }>Tables</button>

            <button>Analytics</button>

            <button>Settings</button>
        </div>
    </nav>
  )
}

export default AdminNav
