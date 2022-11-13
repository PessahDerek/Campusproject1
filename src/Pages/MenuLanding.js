import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Category from '../Componets/Category'
import Spinner from '../Componets/Spinner'
import TopDeal from '../Componets/TopDeal'
import { generateId, onApi } from '../Functions/Func1'
import { setTableNumber } from '../Store/store'

const MenuLanding = () => {
    let dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [spin, setSpin] = useState(false)
    const [foods, setFoods] = useState([])
    const [categories, setCategories] = useState([])
    const [tableNumber, setTbNumber] = useState("")

    useEffect(()=>{
        function setCategs(arr){
            let array = categories
            for (const elem of arr){
                if (!(elem.category in array)){
                    array.push(elem.category)
                }
            }
            let realList = [...new Set(array)]
            setCategories(realList)
        }

        async function getFoods(){
            setSpin(true)
            await axios.get(onApi+'/clientfoods')
            .then(res=>{
                setFoods(res.data);
                setCategs(res.data)
                setSpin(false)
            }, err=>{
                setSpin(false)
            })
            .catch(err=>{
                setSpin(false)
            })
        }
        try {
            //setTbNumber(JSON.parse(location.state).tableNumber)
            dispatch(setTableNumber(JSON.parse(location.state).tableNumber))
        } catch (error) {
            navigate('/')
        }
        getFoods()
    }, [])

    if (foods.length < 1){
        return (
            <>
                <h3>No foods</h3>
                {spin && <Spinner />} 
            </>
        )
    }
  return (
    <div className='menuLanding'>
        {spin && <Spinner />}
        <TopDeal 
            food={foods[2]}
        />
        {categories.length < 1 && <h3>Loading...</h3>}
        <div className='categList'>
            {categories.map(categ=><Category 
                key={generateId()}
                foods={foods.filter(p=>p.category === categ)}
                category={categ}
            />)}
        </div>
        
    </div>
  )
}

export default MenuLanding
