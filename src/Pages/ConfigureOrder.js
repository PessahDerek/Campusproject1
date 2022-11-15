import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './page.css'
import { generateId, reducer, totalReducer } from '../Functions/Func1'
import ListPrices from '../Componets/ListPrices'
import { useDispatch, useSelector } from 'react-redux'
import { addToTray, initialiseWidget, remFromOrder, remFromTray } from '../Store/store'
import ChooseOrder from '../Componets/ChooseOrder'
import Navbar from '../Componets/Navbar'


const ConfigureOrder = () => {
    const location = useLocation()
    const [food, setFood] = useState()

    useEffect(()=>{
        try {
            setFood(location.state.food)
        } catch (error) {
            
        }
    })
    return (
        <div className='configureOrder'>
            
        </div>
    )

}

export default ConfigureOrder
