import React from 'react'
import './admComp.css'
import Imageupload from './Imageupload'

const categories = ['Bevarge', 'Breakfast', 'Lunch', 'Dessert', 'Dinner']

const Addfood = () => {

    const foodcategory = <datalist id="foodcategory">
        {categories.map(category =>
            <option key={categories.indexOf(category)} 
                value={category}
            />)
        }
    </datalist>
  return (
    <div className='addFoodSeg'>
        <h2>Add Food to Menu</h2>
      <form className='addFoodForm'>
        <Imageupload />
        <input 
            placeholder='Food Category'
            list='foodcategory'
            type='text'
        />
        {foodcategory}
        <input 
            placeholder='Food title'
            type="text"
        />
      </form>
    </div>
  )
}

export default Addfood
