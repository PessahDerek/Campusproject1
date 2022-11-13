import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let api = 'https://servymenu.herokuapp.com/api'

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
export const {fetchFoodList, getCategories} = foodSlice.actions
let order_slice = orderSlice.reducer
let food_slice = foodSlice.reducer

const reducer = combineReducers({order_slice, food_slice})
const store = configureStore({reducer})

export default store
