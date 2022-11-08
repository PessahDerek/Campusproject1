import React from 'react'
import { generateId } from '../Functions/Func1'

const ListPrices = (props) => {
    let prices = props.prices
    let flavors = props.flavors
    
  return (
    <div className='listPrices'>
        <h3>Prices</h3>
        <span className='headerSpan'>
            <label>Flavor</label>
            <label>Size</label>
            <label>Price</label>
        </span>
        {prices.map(price=><span key={generateId()}>
            <label>{price.flavour === "" ? "All Flavors" : price.flavour}</label>
            <label>{price.unitSize+`${props.unit}`}</label>
            <label>Ksh.{price.price}</label>
        </span>)
      }
    </div>
  )
}

export default ListPrices
