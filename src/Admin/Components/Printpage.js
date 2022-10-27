import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Printpage = () => {
    const stop = useRef(false)
    useLayoutEffect(()=>{
        let elem = localStorage.getItem('printContent')
        console.log(elem)
        try {
            document.getElementById('displayQRs').innerHTML = elem
        } catch (error) {
            
        }

        function printWhenReady(){
            window.print()
        }
        setTimeout(() => {
            if(!stop.current)printWhenReady()
            stop.current = true
        }, 5000);

    }, [])

  return (
    <div className='printPage'>
      <h1>Print: auto-printed</h1>
      <div id="displayQRs">

      </div>
    </div>
  )
}

export default Printpage
