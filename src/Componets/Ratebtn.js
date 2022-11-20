import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

const Ratebtn = (props) => {
    const [clicked, setClicked] = useState(false)
    
    useEffect(()=>{
        props.id <= props.tot ? setClicked(true) : setClicked(false)

    }, [props.id, props.tot])

    const style = {
        color: `${clicked ? "rgb(255, 217, 0)" : "#b4b4b4"}`
    }

  return (
    <button className='rateBtn' onClick={
        ()=>{
            let x = props.isTrue(props.id)
            //props.show(clicked)
            props.id <= x ? setClicked(true):setClicked(false)
        }
    }>
        <AiFillStar style={style} />
    </button>
)
}

export default Ratebtn
