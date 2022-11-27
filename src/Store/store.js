import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { onApi } from '../Functions/Func1'

//let api = 'https://servymenu.herokuapp.com/api'
let api = 'http://localhost:4000/api'


const adminSlice = createSlice({
  name: 'admin', 
  initialState: {orders: [], foods: [], feedbacks: [], foodFeedBack: []},
  reducers: {
    get_Orders(state, action){
      state.orders = [...new Set(action.payload)]
    },
    get_foods(state, action){
      state.foods = [...new Set(action.payload)]
    },
    get_feedbacks(state, action){
      state.feedbacks = [...new Set(action.payload[0])]
      state.foodFeedBack = [...new Set(action.payload[1])]
    }
  }
})

const orderSlice = createSlice({
  name: 'counter',
  initialState: { tableNumber: "", widgets: [], order: [], prices: [], pendingOrders: [] },
  reducers: {
    // setTableNumber
    setTableNumber(state, action){
      state.tableNumber = action.payload
    },
    // add flavors to list
    addFlavor(state, action) {
      if (!state.flavors.includes(state.payload)) state.flavors.push(action.payload)
    },
    addToTray(state, action){
      if (!state.order.includes(state.payload)) state.order.push(action.payload)
      localStorage.setItem('order', JSON.stringify(state.order))
    },
    remFromOrder(state, action){
      for(let list of state.order){
        if(list.id === action.payload.oder_id){
          let index = list
          list.prices.splice(1, index)
          break
        }
      }
    },
    remFromTray(state, action){
      let holder = state.order.filter(p=>p.id !== action.payload)
      state.order = holder
    },
    addPendingOrder(state, action){
      if(!state.pendingOrders.includes(action.payload))state.pendingOrders.push(action.payload)
    }
  },
})

export const { initialiseWidget, addFlavor, addToTray, remFromTray, remFromOrder, addPendingOrder, setTableNumber } = orderSlice.actions

export const { get_Orders, get_foods, get_feedbacks } = adminSlice.actions

let order_slice = orderSlice.reducer
let admin = adminSlice.reducer

const reducer = combineReducers({order_slice, admin})

const store = configureStore({reducer})

export default store
