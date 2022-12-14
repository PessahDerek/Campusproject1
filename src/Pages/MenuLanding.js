import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Category from '../Componets/Category'
import Spinner from '../Componets/Spinner'
import TopDeal from '../Componets/TopDeal'
import { generateId, onApi } from '../Functions/Func1'
import { setTableNumber } from '../Store/store'
import Navbar from '../Componets/Navbar'
import offer from '../Images/chickonoffer.jpeg'

const MenuLanding = () => {
    let dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [spin, setSpin] = useState(false)
    const [foods, setFoods] = useState([])
    const [categories, setCategories] = useState([])

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

    useEffect(()=>{
        try {
            dispatch(setTableNumber(JSON.parse(location.state).tableNumber))
        } catch (error) {
            navigate('/')
        }
        getFoods()
    }, [dispatch, location.state])

    if (foods.length < 1){
        return (
            <div className='errorDiv'>
                <h1>No foods</h1>
                {spin && <Spinner />} 
                <button className='button4'
                    onClick={getFoods}
                >
                    Refresh
                </button>
            </div>
        )
    }
  return (
    <div className='menuLanding'>
        {spin && <Spinner />}
        {/* <TopDeal 
            food={foods[2]}
        /> */}
        <Navbar />
        <img src={offer} alt='offer' id="offer" />
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
