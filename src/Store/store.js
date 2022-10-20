import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { flavors: ['All Flavors'], prices: [] },
  reducers: {
    // add flavors to list
    addFlavor(state, action) {
      if (!state.flavors.includes(state.payload)) state.flavors.push(action.payload)
    },
    delFlavor(state, action) {
      let array = state.flavors.filter(p=>p !== action.payload);
      state.flavors = array;
    },
    setPrice(state, action) {
      if (state.prices.length > 0){
        // correct price
        for (let element of state.prices){
          if (element.flavor === action.payload.flavor){
            let index = state.prices.indexOf(element);
            state.prices[index] = action.payload;
            break;
          }
        }
        // its a new price for new flavor
        
      } else {
        return {
          ...state,
          prices: [...state.prices, action.payload]
        }
      }
      return {
          ...state,
          prices: [...state.prices, action.payload]
        }
    },
    unsetPrice(state, action){
      let array = state.prices.filter(p=>p.id !== action.payload)
      return {
        ...state,
        prices: array
      }
    }
  },
})

export const { addFlavor, delFlavor, setPrice, unsetPrice } = counterSlice.actions
let counter_slice = counterSlice.reducer

const reducer = combineReducers({counter_slice})
const store = configureStore({reducer})

export default store
