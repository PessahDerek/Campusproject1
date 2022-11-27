import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getFeedBacks } from '../../Functions/Func1'
import { get_feedbacks } from '../../Store/store'
import FeedbackStats from './FeedbackStats'
import FoodAnalytics from './FoodAnalytics'

const Analytics = () => {
    const pageLoad = useRef(0)
    const dispatch = useDispatch()

    useEffect(()=>{
      async function fetchfeedback(){
        let x = getFeedBacks()
        x.then(res=>{
          dispatch(get_feedbacks([res.feedBack, res.foodFeedBack]))
        })
      }
      if(pageLoad.current < 2){
        console.log(pageLoad.current)
        fetchfeedback()
      }
      pageLoad.current++
      
    })
  return (
    <div className='analyticsPage'>
      <FoodAnalytics />
      <FeedbackStats />
    </div>
  )
}

export default Analytics
