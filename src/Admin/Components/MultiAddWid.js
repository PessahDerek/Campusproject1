import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Func1 from '../../Functions/Func1';

let ids = [""];
const getId = () =>{
    let id = (Math.random() * 100).toFixed(0);
    if (!ids.includes(id)) return id;
    getId();
}

const MultiAddWid = (props) => {
    const [widgets, setWidgets] = useState([{id: getId(), elem: props.widget}])

    const getWidg = () => ({id: getId(), elem: props.widget})

    const add = (value, index) =>{
        let thisDataArray = props.dataArray;
        thisDataArray[index] = value;
        console.log("xx:", value)
        props.add(thisDataArray);
        setWidgets(prev=>([...prev, getWidg()]))
    }
    const del = (query, index) =>{
        let thisDataArray = props.dataArray
        let filtered = thisDataArray.filter((value)=>value !== query);
        props.add(filtered)
        
        let newWidgs = widgets.filter(wid=>widgets.indexOf(wid) !== index);
        setWidgets(newWidgs)
    }

    return (
        <>
            {/* map widget array */}
            {widgets.map(widget=>{
                let Widg = widget.elem;
                return <Widg 
                    key={widget.id}
                    index={widgets.indexOf(widget)}
                    add={add}
                    del={del}
                    unit={props.unit}
                />
            })}
        </>
    )
}

export default MultiAddWid
