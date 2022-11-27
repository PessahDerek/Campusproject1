import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { generateId } from '../../Functions/Func1'
import ReadFoodFB from './ReadFoodFB'

const FeedbackStats = () => {
    const foodFeedBack = useSelector(state=>state.admin.foodFeedBack)
    const customerFeedback = useSelector(state=>state.admin.feedbacks)
    const foods = useSelector(state=>state.admin.foods)
    const [selectFood, setSelectFood] = useState("")
    const [filter, setFilter] = useState([])

    const filterThisFood = (food) =>{
        let foodFeed = foodFeedBack.filter(f=>f.food === food)
        if(foodFeed.length > 0){
            console.log(foodFeed[0].feedback)
            return setFilter(foodFeed[0].feedback)
        } 
        setFilter(undefined)
    }
    
  return (
    <div className='feedbackStats'>
      <h1>Customer Feedback:  {selectFood}</h1>
        <article>
            <section>
                {/* buttons */}
                {foods.map(food=><button className='sqBtn1'
                    key={food._id}
                    onClick={()=>{
                        filterThisFood(food._id)
                        setSelectFood(food.title)
                    }}
                >
                    {food.title}
                </button>)}
            </section>
            <section>
                {typeof(filter) !== 'undefined' && filter.length < 1 && <h3>No Comments</h3>}
                {typeof(filter) !== 'undefined' && filter.length > 0 && filter.map(feedback => <ReadFoodFB 
                    key={generateId()}
                    comment={feedback}
                />)}
                {typeof(filter) === 'undefined' && <h4>No Feedback</h4>}
            </section>
        </article>
        <h1>General Feedback</h1>
        <article className='generalFeedback'>
            {customerFeedback.length < 1 && <h2>No Feedback received</h2>}
            {customerFeedback.map(fb=><ReadFoodFB 
                key={fb._id}
                comment={fb.feedback}
            />)}
        </article>
    </div>
  )
}

export default FeedbackStats
