import React from 'react'

const FindInput = (props) => {
  return (
    <input
        className='searchInp' 
        placeholder='Search'
        value={props.value}
        onChange={e=>props.find(e.target.value)}
    />
  )
}

export default FindInput
