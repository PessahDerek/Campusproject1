import React from 'react'
import { useNavigate } from 'react-router-dom'
import './comp.css'

const Category = (props) => {
    let foods = props.foods
    let img = typeof(foods) === 'undefined' ? props.img : foods[0].image
    const navigate = useNavigate()

    const goToCateg = () =>{
        navigate('viewcategory', {state: {foods: foods}})
    }
  return (
    <div className='category' onClick={goToCateg}>
      <h3>{props.category}</h3>
      <img src={img} alt='category' />
    </div>
  )
}

export default Category
