import React, { useEffect, useState } from 'react'

const AddFlavor = (props) => {
    const [flavor, setFlavor] = useState("");
    const [winWidth, setWidth] = useState();
    const [clicked, setClicked] = useState(false)
    
    window.addEventListener("resize", (e)=>setWidth(e.target.innerWidth))
    useEffect(()=>{
      setWidth(window.innerWidth)
    }, [])

    const addFlav = async() =>{
      if (!clicked){
        await props.addFlav(flavor, props.index)
        .then(res=>setClicked(res))
        .catch(err=>alert(err.message))
      }
    }
    const remFlav = () =>{
      props.delFlav(props.id, props.index)
    }
    const style = {
      gridTemplateColumns: winWidth < 900 && "78%"
    }
    const inpStyle = {
      width: "100%"
    }
  return (
    <div className='addCategory' style={style}>
      <input 
        style={inpStyle}
        placeholder='Flavor'
        value={flavor}
        onChange={e=>setFlavor(e.target.value)}
      />
      <button onClick={addFlav} type='button'>
        Add +
      </button>
      <button onClick={remFlav} type='button'>
        Del -
      </button>
    </div>
  )
}

export default AddFlavor
