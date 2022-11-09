import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './page.css'
import { generateId, reducer, totalReducer } from '../Functions/Func1'
import ListPrices from '../Componets/ListPrices'
import { useDispatch, useSelector } from 'react-redux'
import { addToTray, initialiseWidget, remFromTray } from '../Store/store'
import ChooseOrder from '../Componets/ChooseOrder'


const ConfigureOrder = () => {
    const location = useLocation()
    const widgetList = useSelector(state=>state.order_slice.widgets)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [clicked, setClicked] = useState(false)
    const [food, setFood] = useState()
    const [flavors, setFlavors] = useState([])
    const [total, setTotal] = useState(0)

    const [userComment, setComment] = useState("")
    const [widget, setWidget] = useState([{id: generateId(), elem: ChooseOrder}])
    const [thisFoodOrder, setThisFoodOrder] = useState([])


    useEffect(()=>{
        // on component mount
        let fromState = location.state.food;
        try {
            if (typeof(fromState) === 'object'){
                setFood(fromState)
            }
            setFlavors([...new Set(fromState.flavors)])
            
            if(typeof(fromState) === 'undefined') return
            
            if(JSON.parse(localStorage.getItem(`${fromState._id}widgs`))){
                if(widget.length >= JSON.parse(localStorage.getItem(`${fromState._id}widgs`)).length){
                    return
                }
                let ids = JSON.parse(localStorage.getItem(`${fromState._id}widgs`))
                let widgs = []
                for(let id of ids){
                    widgs.push({id: id.id, elem: ChooseOrder})
                }
                setWidget(widgs)
                localStorage.removeItem(`${fromState._id}widgs`)
                
                return
            }
        } catch (error) {
            console.log(error)
            //navigate('/')
        }

    }, [])

    // set up defaults from storage
    useEffect(()=>{
        let fromState = location.state.food;
        // comment
        if(localStorage.getItem(`${fromState._id}comment`)) setComment(localStorage.getItem(`${fromState._id}comment`))
        // add_to_cart btn
        if(typeof(localStorage.getItem(`${fromState._id}trayClicked`)) !== 'undefined')setClicked(JSON.parse(localStorage.getItem(`${fromState._id}trayClicked`)))

    }, [])

    useEffect(()=>{
        let fromState = location.state.food
        
        try {
            if(localStorage.getItem(`${fromState._id}total`) !== 'null'){
                setTotal(Number(localStorage.getItem(`${fromState._id}total`)))
            }
            
        } catch (error) {
            
        }
        return ()=>{
            if(localStorage.getItem(`${fromState._id}total`) !== 'null'){
                setTotal(Number(localStorage.getItem(`${fromState._id}total`)))
            }
        };
    }, [total])

    useEffect(()=>{
        let fromState = location.state.food;
        return () => {
            localStorage.setItem(`${fromState._id}widgs`, JSON.stringify(widget))
            //localStorage.clear()
        }
    }, [widget])

    const send_to_list = (val) => {
        if(val.foods.length < 1)return alert('Add food to list')
        dispatch(addToTray(val))
        setClicked(true)
        localStorage.setItem(`${food._id}trayClicked`, JSON.stringify(true))
    }

    const add_to_list = (clicked, value) =>{
        let currOrder = thisFoodOrder
        if (clicked){
            // delete from list
            // this time value is id and not object
            console.log('del', value)
            let newList = currOrder.filter(p=>p.id !== value.id)
            setThisFoodOrder(newList)
            return
        }
        console.log('hapa', value)
        let exists = currOrder.filter(p=>p.id === value.id)
        if (exists.length > 0){
            // replace
            currOrder[currOrder.indexOf(exists[0])] = value
            setThisFoodOrder(currOrder)
            return
        }else{
            // add new
            setThisFoodOrder(p=>([...p, value]))
        }
    }

    function rem_frm_tray(){
        if (!clicked) return
        dispatch(remFromTray(food._id))
        setClicked(false)
        localStorage.setItem(`${food._id}trayClicked`, JSON.stringify(false))
    }


    if (typeof(food) === 'undefined') return <h1>Waiting...</h1>
  return (
    <div className='configurePage'>
      <nav>
        <h2 id='foodTitle'>{food.title}</h2>
      </nav>
      <img src={food.image} alt='food' />
      <ListPrices 
        flavors={flavors}
        prices={food.prices}
        unit={food.unit}
      />

      <form>
        <h3>Juice Order (total: {total})</h3>
        <span className='headerSpan'><label>Flavor</label><label>Size</label><label>Quantity</label><label>Totals</label></span>
        <>
            {widget.map(widg=>{
                let Widg = widg.elem;
                return <Widg 
                    key={widg.id}
                    id={widg.id}
                    flavors={flavors}
                    food={food}
                    addToList={add_to_list}
                    setTotal={(val)=>{
                        setTotal(total + val)
                        localStorage.setItem(`${food._id}total`, total+val)
                    }}
                    revert={(pre, post)=>{
                        setTotal(total - pre)
                        setTotal(post)
                        localStorage.setItem(`${food._id}total`, post)
                    }}
                    widgetList={widget}
                    add_widg={setWidget}
                    setLStotal={()=>localStorage.setItem(`${food._id}total`, total)}
                    rem_widg={(val)=>{
                        setTotal(total-val)

                        localStorage.setItem(`${food._id}total`, total-val)
                    }}
                />
                })
            }
        </>
        
        <textarea 
            placeholder={`You may describe how you like your ${food.title} served`}
            value={userComment}
            onChange={e=>{
                setComment(e.target.value)
                localStorage.setItem(`${food._id}comment`, userComment)
            }}
        />
        <button className='button1' 
            type='button'
            onClick={()=>{
                clicked ? rem_frm_tray() : send_to_list({ id: food._id, foods: thisFoodOrder, comment: userComment})
            }
            }
        >
            {clicked ? 'Remove from tray' : 'Add to tray, continue to menu'}
        </button>
        <button className='button1'
            type='button'
        >
            Complete order
        </button>
      </form>
    </div>
  )
}

export default ConfigureOrder
