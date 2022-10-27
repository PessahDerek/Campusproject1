import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Category from '../Componets/Category'

const CategoryList = () => {
    const location = useLocation()
    const [foods, setFoods] = useState([])

    useEffect(()=>{
        try {
            // console.log(location.state.foods)
            setFoods(location.state.foods)
        } catch (error) {
            
        }
        
    }, [foods, location])



    if (foods.length < 1) return <h1>Wait...</h1>
  return (
    <div className='categoryList'>
        <nav>
            <h2>{foods[0].category}</h2>
            <input
                className='searchInp' 
                placeholder='search'
            />
        </nav>
        <div className='categList'>
            {foods.map(food=><Category 
                key={food._id}
                img={food.image}
            />)}
        </div>
    </div>
  )
}

export default CategoryList
