import React, { useEffect, useState } from 'react'
import './admComp.css'
import Imageupload from './Imageupload'
import AddFlavor from './AddFlavor'
import AddPrice from './AddPrice'
import  { generateId, addFoodToMenu, getWidget, onApi } from '../../Functions/Func1'
import Spinner from '../../Componets/Spinner'
import axios from 'axios'
import Popup from '../../Componets/Popup'
import ViewFood from './ViewFood'

const foodCategs = ['Beverage', 'Breakfast', 'Lunch', 'Dessert', 'Dinner']

const Addfood = () => {  
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState("")
  const [spin, setSpin] = useState(false)
  const [foods, setFoods] = useState([])
  const [details, setDetails] = useState({
    image: "",
    category: "",
    title: "",
    description: "",
    price: ""
  })

  useEffect(()=>{
    //fetch foods
    async function getFoods(){
      await axios.get(onApi+'/clientfoods')
      .then(res=>{
        setFoods(res.data)
      })
      .catch(err=>{
        
      })
    }
    function getCategories(){
      for(let elem of foods){
        if(!categories.includes(elem.category)){
          setCategories(p=>([...p, elem.category]))
        } 
      }
      return
    }

    getFoods()
    getCategories()
  })

  const addFoodToMenu = async(e) =>{
    e.preventDefault()
    setSpin(true)

    let addFoodForm = new FormData()
    addFoodForm.append('category', details.category)
    addFoodForm.append('title', details.title)
    addFoodForm.append('description', details.description)
    addFoodForm.append('price', details.price)
    addFoodForm.append('image', details.image)
    await axios.post(onApi+'/addfood', addFoodForm, {
      headers: {"Content-Type": "multipart/form-data"}
    })
    .then(res=>{
      if(res.data.err){
        //setMessage(res.data.message)
        return setSpin(false)
      }
      console.log(res.data.message)
      //setMessage(res.data.message)
      setSpin(false)
    }, err=>{
      setMessage(err.message)
      setSpin(false)
    })
    .catch(err=>{
      setMessage()
      setSpin(false)
    })
  }

  
  let categs = <datalist id='categories'>
    {categories.map(categ=><option key={generateId()}>
      {categ}
    </option>)}
  </datalist>

  return(
    <div className='addFood'>
      <section className=''>
        {spin && <Spinner />}
        {message && <Popup message={message} dismiss={setMessage} />}
        <h1>Add Food</h1>
        <form className='addFoodForm' onSubmit={addFoodToMenu}>
          <Imageupload 
            setImage={setDetails}
          />
          <input className='input1'
            placeholder='Category'
            list='categories'
            required
            value={details.category}
            onChange={e=>setDetails(p=>({...p, category: e.target.value}))}
          />
          {categs}
          <input 
            placeholder='Title'
            required
            value={details.title}
            onChange={e=>setDetails(p=>({...p, title: e.target.value}))}
          />
          <textarea 
            placeholder='Food Description'
            required
            value={details.description}
            onChange={e=>setDetails(p=>({...p, description: e.target.value}))}
          />
          <input 
            placeholder='Price'
            required
            value={details.price}
            onChange={e=>setDetails(p=>({...p, price: e.target.value}))}
          />
          <button className='button1'

          >Add Food</button>
        </form>
      </section>

      <section id='seeMenu'>
      <nav><h1>Roaster's Menu</h1></nav>
        {foods.length < 1 && <h2>{message || "No Food on Menu"}</h2>}
        <div className='foodList'>
          {foods.map(food=><ViewFood 
            key={food._id}
            food={food}
          />)}
        </div>
        
      </section>
    </div>
  )
  
}

export default Addfood
