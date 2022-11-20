import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dropdown = (props) => {
    const [clicked, setClicked] = useState(false)
    let buttons = props.buttons // {text: "", path: ""}
    const navigate = useNavigate()

    const clickAnim = () =>{
        let b1 = document.getElementById('ham1').style;
        let b2 = document.getElementById('ham2').style;
        let b3 = document.getElementById('ham3').style;
        let items = document.querySelector('.dropDown .items').style;
    
        let originHeight = '100%'
        if (clicked){
          b1.width = originHeight;
          b2.width = originHeight;
          b3.width = originHeight;
          items.width = '0vw'
          items.display = 'none'
        }else{
          b1.width = "90%";
          b2.width = "50%";
          b3.width = "10%";
          items.width = "80vw";
          items.display = 'grid';
        }
        setClicked(!clicked)
    }
    const gotoPath = (path, state)=>{
        navigate(path, {state: {state: state}})
    }
  return (
      <div className='dropDown'>
        <button onClick={clickAnim}
            className="dropBtn"
        >
            <div id='ham1' />
            <div id='ham2' />
            <div id='ham3' />
        </button>
        <div className='items'>
            {buttons.map(btn=><button
                key={buttons.indexOf(btn)}
                onClick={()=>gotoPath(btn.path, btn.state)}
            >
                {btn.text}
            </button>)}
        </div>
    </div>
  )
}

export default Dropdown
