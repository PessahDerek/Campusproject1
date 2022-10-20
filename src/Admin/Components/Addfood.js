import React, { useState } from 'react'
import './admComp.css'
import Imageupload from './Imageupload'
import AddFlavor from './AddFlavor'
import AddPrice from './AddPrice'
import  { generateId, addFoodToMenu, getWidget } from '../../Functions/Func1'

const foodCategs = ['Beverage', 'Breakfast', 'Lunch', 'Dessert', 'Dinner']

const Addfood = () => {  
  const [flavWidg, setFlavWidg] = useState([{id: generateId(), elem: AddFlavor}])
  const [priceWidg, setPriceWidg] = useState([{id: generateId(), elem: AddPrice}])

  const [image, setImage] = useState("")
  const [food, setFood] = useState({category: "", title: "", unit: ""})
  const [flavors, setFlavors] = useState([""])
  const [flavNprice, setFlavNprice] = useState([''])


  async function addFlavors(value, index){
    let currFlavs = flavors;
    currFlavs[index] = value;
    setFlavors(currFlavs);
    setFlavWidg(p=>([...p, getWidget('flav')]));
    return !flavWidg.length >= 1;
  }

  function remFlavors(id, index){
    let currFlavs = flavors.filter(p=>flavors.indexOf(p) !== index)
    setFlavors(currFlavs)
    let currWidgs = flavWidg.filter(p=>p.id !== id)
    if (currWidgs.length < 1){
      setFlavWidg(p=>([...p, getWidget('flav')]))
    }else{
      setFlavWidg(currWidgs)
    }
  }

  function addPrice(value, index){
    let prices = flavNprice;
    prices[index] = value;
    setFlavNprice(prices)
    setPriceWidg(p=>([...p, getWidget()]))
    return priceWidg.length >= 1
  }

  function remPrice(id, index){
    let price = flavNprice.filter(p=>flavNprice.indexOf(p) !== index)
    setFlavNprice(price)
    let currWidgets = priceWidg.filter(p=>p.id !== id)
    if (currWidgets.length < 1){
      setPriceWidg(p=>([...p, getWidget()]));
    }else{
      setPriceWidg(currWidgets)
    }
  }
  
  async function add_food(){
    if (food.category && food.title && flavNprice.length > 0){
      let data = {
        image: image,
        category: food.category, 
        title: food.title,
        unit: food.unit,
        prices: flavNprice
      }
      let response = await addFoodToMenu(data)
      console.log(response)
    } 
  }

  const foodcategory = <datalist id="foodcategory">
        {foodCategs.map(category =>
            <option 
              key={generateId()} 
              value={category}
              index={foodCategs.indexOf(category)}
            />)
        }
    </datalist>
  return (
    <div className='addFoodSeg'>
      <h2>Add Food to Menu</h2>
      <form className='addFoodForm'>
        <section>
          <Imageupload 
            value={image}
            setImage={setImage}
          />
          <input 
              placeholder='Food Category'
              list='foodcategory'
              type='text'
              value={food.category}
              onChange={e=>setFood(p=>({...p, category: e.target.value}))}
          />
          {foodcategory /**just food category list */}
          <input 
              placeholder='Food title'
              type="text"
              value={food.title}
              onChange={e=>(setFood(p=>({...p, title: e.target.value})))}
          />
          <input 
            placeholder='Food Measure Unit'
            value={food.unit}
            onChange={e=>setFood(p=>({...p, unit: e.target.value}))}
            list="unitList"
          />
          {/* add flavours */}
          <label>Add Flavors</label>
          <>
            {flavWidg.map(widg=>{
              let Widget = widg.elem;
              return <Widget 
                key={widg.id}
                id={widg.id}
                index={flavWidg.indexOf(widg)}
                addFlav={addFlavors}
                delFlav={remFlavors}
              />
            })}
          </>
          
        </section>
        <section>
          {/* add type */}
          <label>Add Price</label>
          <>
            {priceWidg.map(widg=>{
              let Widget = widg.elem;
              return <Widget 
                key={widg.id}
                id={widg.id}
                index={priceWidg.indexOf(widg)}
                unit={food.unit}
                flavors={flavors}
                addFlavNprice={addPrice}
                remFlavNprice={remPrice}
              />
            })}
          </>

        </section>
        
      </form>
      <button className='button1' 
        onClick={add_food}
      >
        Add Food
      </button>
    </div>
  )
}

export default Addfood
