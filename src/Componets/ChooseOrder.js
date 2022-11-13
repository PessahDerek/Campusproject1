import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { generateId, purgeInputs } from '../Functions/Func1'

const ChooseOrder = (props) => {
    let widgetList = props.widgetList
    let flavors = useRef(props.flavors)
    let food = props.food
    let init_total = useRef(0)
    const loaded = useRef(0)
    
    const thisId = useRef(generateId())
    const [clicked, setClicked] = useState(false)
    const [quant, setQuant] = useState(null || localStorage.getItem(`inp${props.id}`))
    const [userFlav, setFlav] = useState(flavors.current[0])
    const [userSize, setUserSize] = useState(food.prices[0].unitSize)
 
    function add_to_list(){
        // Send to parent
        let thisFood = {
            id: thisId.current,
            food: food.title,
            flavor: userFlav,
            size: `${userSize}${food.unit}`,
            quantity: quant,
            cost: init_total.current !== 0 ? init_total.current : getTotal()
        }

        props.addToList(!clicked, thisFood)
    }

    useEffect(()=>{
        if(localStorage.getItem(`${props.id}total`) !== 'null')init_total.current = Number(localStorage.getItem(`${props.id}total`))
    }, [])

    useLayoutEffect(()=>{
        try {
            if(localStorage.getItem(`inp${props.id}`)) document.getElementById(`inp${props.id}`).value = localStorage.getItem(`inp${props.id}`)
            setQuant(0 || localStorage.getItem(`inp${props.id}`))
 
            if(localStorage.getItem(`${props.id}flav`) !== null){
                setFlav(localStorage.getItem(`${props.id}flav`))
            }
            if(localStorage.getItem(`${props.id}userSize`) !== null)setUserSize(localStorage.getItem(`${props.id}userSize`))

            if(typeof(localStorage.getItem(`${props.id}Clicked`)) !== 'undefined'){
                setClicked(JSON.parse(localStorage.getItem(`${props.id}Clicked`)))
                if(JSON.parse(localStorage.getItem(`${props.id}Clicked`)))return add_to_list()
            }
        } catch (error) {
            
        }
    }, [add_to_list, clicked, props.id])
   
    function getTotal(){
        let price = food.prices
        let use = price.filter(elem=>userFlav.includes(elem.flavour) && userSize.includes(String(elem.unitSize)))
        let quantInput = document.getElementById(`inp${props.id}`)
        return (Number(quantInput.value) * Number(use[0].price))
    }
    function addWidget(){
        if (widgetList.length < 2){
           setClicked(false) 
           localStorage.setItem(`${props.id}Clicked`, JSON.stringify(clicked))
        } 
        
        // add widget
        if (!clicked) {
            if (quant < 1) return document.getElementById(`inp${props.id}`).style.outline = '2px solid red'
            props.add_widg(p=>([...p, {id: generateId(), elem: ChooseOrder}]))
            setClicked(true)
            add_to_list()
            localStorage.setItem(`${props.id}Clicked`, JSON.stringify(true))
            return
        }
        // remove widget
        if (widgetList.length <= 1) return 
        props.add_widg(widgetList.filter(p=>p.id !== props.id))
        // affect the total
        init_total.current !== 0 ? props.rem_widg(init_total.current): props.rem_widg(getTotal())
        setClicked(false)
        props.autoClick(thisId.current)
        //add_to_list()

        localStorage.setItem(`${props.id}Clicked`, JSON.stringify(false))
        purgeInputs(`${props.id}flav`, `${props.id}userSize`, `inp${props.id}`, `${props.id}Clicked`)
    }

    function set_total(e){
        if (isNaN(Number(e.target.value))) return
        let price = food.prices
        let quantInput = document.getElementById(`inp${props.id}`)
        
        let use = price.filter(elem=>userFlav.includes(elem.flavour) && userSize.includes(String(elem.unitSize)))

        // correct on delete
        if (Number(e.target.value) < init_total.current){
            props.revert(init_total.current, Number(quantInput.value) * Number(use[0].price))
            //console.log(quantInput.value)
            init_total.current = Number(quantInput.value) * Number(use[0].price)
            return
        }

        // setQuant({payload: quantInput.value})
        init_total.current = (Number(quantInput.value) * Number(use[0].price))
        props.setTotal(init_total.current)
        document.getElementById(`inp${props.id}`).style.outline = 'transparent'
    }

  return (
    <span>
        <select placeholder='Flavor' value={userFlav}
            onChange={e=>{
                setFlav(e.target.value)
                localStorage.setItem(`${props.id}flav`, e.target.value)
            }}
        >
            {flavors.current.map(arr=><option key={flavors.current.indexOf(arr)} value={arr}>
                {arr}
            </option>)
            } 
        </select>

        <select value={userSize} 
            onChange={e=>{
                setUserSize(e.target.value)
                localStorage.setItem(`${props.id}userSize`, e.target.value)
            }}
        >
            {food.prices.map(size=><option key={generateId()} value={size.unitSize}>
                {size.unitSize + `${food.unit}`}
            </option>)}
        </select>

        <input 
            placeholder='Quantity'
            id={`inp${props.id}`}
            readOnly={clicked}
            onChange={e=>{
                set_total(e)
                setQuant(e.target.value)
                localStorage.setItem(`inp${props.id}`, e.target.value)
            }}
        />
        <button type='button'
            onClick={addWidget}
        >
            {clicked ? "Remove" : "Add+"}
        </button>
    </span>
  )
}

export default ChooseOrder
