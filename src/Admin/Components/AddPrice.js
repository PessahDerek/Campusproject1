import React, { useState } from 'react'


const AddPrice = (props) => {
    let flavors = props.flavors
    const [clicked, setClicked] = useState(false)
    const [flavNprice, setFlavNprice] = useState({
        unitSize: "", 
        price: "",
        flavour: "",
    })

    function set_price(){
      if (!clicked && flavNprice.price){
        setClicked(props.addFlavNprice(flavNprice, props.index))
      }
    }

    function unset_price(){
      if(flavNprice.price) props.remFlavNprice(props.id, props.index)
    }

  return (
    <div className='addCategory'>
      <select //value={flavNprice.flavour}
        value={flavNprice.flavour || 'All Flavors'}
        onChange={e=>setFlavNprice(p=>({...p, flavour: e.target.value}))}
      >
        <option value={'All Flavors'}>All Flavors</option>
        {flavors.map(flav=><option key={flavors.indexOf(flav)}
        value={flav}
        >{flav}</option>)}
      </select>
      <input 
        placeholder='Unit'
        value={props.unit}
        readOnly
      />
      <input 
        placeholder={`unit size in ${props.unit}`}
        value={flavNprice.unitSize}
        onChange={e=>{
          setFlavNprice(p=>({...p, unitSize: e.target.value}))
        }}
      />
      <input 
        placeholder='Price of unit size'
        value={flavNprice.price}
        onChange={e=>setFlavNprice(p=>({...p, price: e.target.value}))}
      />
      <button type='button' 
        onClick={set_price} 
      >
        Add +
      </button>
      <button type='button'
        onClick={unset_price}
      >
        Del -
      </button>
    </div>
  )
}

export default AddPrice
