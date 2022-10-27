import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ViewQRprint from './ViewQRprint'

const PrintQr = (props) => {
    const array = useRef(props.array)
    const navigate = useNavigate()
    const [printArr, setPrintArr] = useState(props.array)
    
    const printUnprinted = (array) =>{
        setPrintArr(array)
        let element = document.getElementById('printQRs').innerHTML
        console.log(typeof(element))
        localStorage.setItem('printContent', element)
        window.open('/print', '_blank')
    }
    const printAll = () =>{
        setPrintArr(array.current)
    }
  return (
    <div className='printQrFloatPage'>
        <div className='btns'>
            <button className='button1'
            onClick={printAll}>Print All</button>
            <button className='button1' 
                onClick={()=>printUnprinted(array.current.filter(p=>!p.printed))}
            >
                Unprinted Only: {array.current.filter(p=>!p.printed).length}/{array.current.length}
            </button>
            <button className='button1' onClick={()=>props.hide(false)}>
                Cancel
            </button>
        </div>
        <div className='qrs' id='printQRs'>
            {printArr.map(printArr=><ViewQRprint 
            key={printArr._id}
            qrImage={printArr.qr_code}
            num={printArr.number}
            printed={printArr.printed}
            />)}
      </div>
    </div>
  )
}

export default PrintQr
