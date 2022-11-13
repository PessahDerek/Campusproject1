import QrScanner from 'qr-scanner'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import adapter from 'webrtc-adapter'
import Navbar from '../Componets/Navbar'
import './page.css'

let stopScan = false
let hasilScan = ''

const QRScanpage = () => {
  const [clicked, setClicked] = useState(true)
  const navigate = useNavigate()
  
  const scanNow = async (isScan) => {
    setClicked(isScan)
    if (isScan) stopScan = true
    if (clicked === false) return
    stopScan = false
    await new Promise(r => setTimeout(r, 100))
    const videoElement = document.getElementById('vidElem')
    const scanner = new QrScanner(
      videoElement,
      result => {
        hasilScan = result.data
        navigate('/roasters', {state: hasilScan})
        setClicked(true)
        stopScan = true
      },
      {
        onDecodeError: error => {
          console.error(error)
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true
      }
    )
    await scanner.start()
    while (stopScan === false) await new Promise(r => setTimeout(r, 100))
    scanner.stop()
    scanner.destroy()
  }

  return (
    <div>
      <video id="vidElem">

      </video>
      <button className='button1'
        onClick={()=>scanNow(!clicked)}
      >
        {clicked ? 'Scan' : 'Capture'}
      </button>
    </div>
  )
}

export default QRScanpage
