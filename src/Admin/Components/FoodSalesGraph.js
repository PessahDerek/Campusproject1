import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../../Componets/Spinner'
import { getFoods } from '../../Functions/Func1'
import GraphBar from './GraphBar'

const FoodSalesGraph = (props) => {
  const pageLoad = useRef(0)
  let orders = props.orders
  const foods = useSelector(state=>state.admin.foods)
  const [totSales, setTotals] = useState(0)

  const getHeight = (foodId) =>{
    let allOrders = []
    orders.forEach(elem=>{
      if(!allOrders.includes(elem.orders)){
        allOrders.push(elem.orders)
      }
    })
    let tot = 0
    allOrders.forEach(elem=>{
      for(let x of elem){
        if(x.id === foodId) tot += x.cost
      }
    })
    let height = (tot/totSales )* 100
    if (height === Infinity)return 'wait'
    return height
  }
  function getTotals(){
    let tot = 0
    for(const elem of orders){
      elem.orders.forEach(element => {
        tot+=element.cost
      });
    }
    setTotals(tot)
  }
  
  useEffect(()=>{
    getTotals()
    pageLoad.current += 1
  })
  return (
    <div className='graph'>
      <div className='x'>
        <label>
          Total Sales
        </label>
        <h3>KSh.{totSales}</h3>
        
      </div>
      <div className='y'>
        <h1>Food Sales</h1>
        <div className='bars'>
          {foods.map(food=><GraphBar 
            key={food._id}
            food={food}
            getHeight={getHeight}
          />)}
        </div>
        <label>
          Foods
        </label>
      </div>
    </div>
  )
}

export default FoodSalesGraph
