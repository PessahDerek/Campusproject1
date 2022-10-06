import React from 'react'
import './admComp.css'

const AdminNav = (props) => {
  return (
    <nav className='adminNav'>
        <h1 className='cuteH1'>Servy</h1>

        <div>
            <button>Orders({props.orderNotif})</button>
            <button>Attention({props.attentNotif})</button>
            <button>Menu</button>
            <button>Feedback</button>
        </div>
    </nav>
  )
}

export default AdminNav
