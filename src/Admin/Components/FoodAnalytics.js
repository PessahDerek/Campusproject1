import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetch_orders, getFoods } from '../../Functions/Func1'
import { get_foods, get_Orders } from '../../Store/store'
import FoodRatingGraph from './FoodRatingGraph'
import FoodSalesGraph from './FoodSalesGraph'

const FoodAnalytics = () => {
  const dispatch = useDispatch()
  const pageLoad = useRef(0)
  const orders = useSelector(state=>state.admin.orders)

  useEffect(()=>{
    async function set_Foods(){
      let x = getFoods()
      x.then(res=>{
        dispatch(get_foods(res))
      })
    }
    
    const g_o = async()=>{
      let x = fetch_orders()
      x.then(res=>{
        dispatch(get_Orders(res))
      })
    }
    if(pageLoad.current < 2){
      g_o()
      set_Foods()
    }
  })
  
  
  // get orders
  return (
    <div className='generalFoodStatistics'>
      <nav className='analyticsNav'>
        <h1>General Statistics</h1>
      </nav>
      <FoodSalesGraph orders={orders} />
      <FoodRatingGraph />
    </div>
  )
}

export default FoodAnalytics
