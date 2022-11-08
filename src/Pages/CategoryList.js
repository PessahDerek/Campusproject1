import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Category from '../Componets/Category'
import Dropdown from '../Componets/Dropdown'
import FindInput from '../Componets/FindInput'
import SelectFood from '../Componets/SelectFood'

const CategoryList = () => {
    const location = useLocation()
    const [foods, setFoods] = useState([])
    const [find, setFind] = useState("")

    const filter = (e) =>{
        let arr = foods.filter(p=>p.title.includes(e.target.value))
        setFoods(arr)
    }
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
            <div>
                <h2>{foods[0].category}</h2>
                <Dropdown 
                    buttons={[
                        {text: "Go to tray"}
                    ]}
                />
            </div>
            <FindInput
                value={find}
                find={setFind}
            />
            
        </nav>
        <div className='categList'>
            {find.length < 1 && foods.map(food=>{
                return <SelectFood 
                    key={food._id}
                    food={food}
                />})
            }
            {find.length > 1 && foods.filter(p=>p.title.toLowerCase().includes(find.toLowerCase())).map(
                food=><SelectFood 
                    key={food._id}
                    food={food}
                />
            )

            }
        </div>
    </div>
  )
}

export default CategoryList
