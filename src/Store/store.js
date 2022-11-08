import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let api = 'https://servymenu.herokuapp.com/api'
localStorage.clear()

const foodSlice = createSlice({
  name: 'foods',
  initialState: {foodList: [], categories: []},
  reducers: {
    getCategories(state, action){
      let array = state.categories
      for (const elem of state.foodList){
          if (!(elem.category in array)){
              array.push(elem.category)
          }
      }
      let realList = [...new Set(array)]
      state.categories = realList
    },
    fetchFoodList(state, action){
      let list;
      axios.get(api+'/clientfoods')
      .then(res=>{
        list = res.data
      })
      .catch(err=>{
        console.log(err)
      })
      for(let elem in list) state.foodList.push(elem)
    },
    getFood(state, action){
      for(const elem in state.foodList){
        if(elem._id === action.payload)return elem;
      }
    }


  }
})

const orderSlice = createSlice({
  name: 'counter',
  initialState: { widgets: [],order: [], prices: [] },
  reducers: {
    // add flavors to list
    addFlavor(state, action) {
      if (!state.flavors.includes(state.payload)) state.flavors.push(action.payload)
    },
    addToTray(state, action){
      if (!state.order.includes(state.payload)) state.order.push(action.payload)
      localStorage.setItem('order', JSON.stringify(state.order))
    },
    remFromTray(state, action){
      let holder = state.order.filter(p=>p.id !== action.payload)
      state.order = holder
    }
  },
})

export const { initialiseWidget, addFlavor, addToTray, remFromTray } = orderSlice.actions
export const {fetchFoodList, getCategories} = foodSlice.actions
let order_slice = orderSlice.reducer
let food_slice = foodSlice.reducer

const reducer = combineReducers({order_slice, food_slice})
const store = configureStore({reducer})

export default store
