import axios from 'axios';
import React, { useState } from 'react'
import './admComp.css'
import { add_tables, generateId, gettablelist, getTables, onApi } from '../../Functions/Func1';
import Spinner from '../../Componets/Spinner';
import { useEffect } from 'react';
import ViewTable from './ViewTable';

const SetupRestaurant = () => {
    const [defTables, setDefTables] = useState("");
    const [spin, setSpin] = useState(false)
    const [newTable, setNewTable] = useState("");
    const [tablelist, setTableList] = useState([])

    useEffect(()=>{
        getTables(setTableList)
    }, [tablelist])

    const addDefaults = async (e) =>{
        e.preventDefault()
        if (!newTable) return;
        setSpin(true)
        await axios.post(onApi+"/registertables", ({count: newTable}))
        .then((res)=>{
            setSpin(false)
            console.log(res.data)
            getTables(setTableList)
        }, err=>{
            setSpin(false)
            console.log(err.message)
        })
        .catch(err=>{
            console.log(err.message)
            setSpin(false)
        })
    }
  return (
    <div className='setupRestPage'>
    {spin && <Spinner />}
      <section>
        <form className='addTableForm' onSubmit={addDefaults}>
            <h1>Add Tables</h1>
            <p>Number of tables to add</p>
            <input 
                placeholder='Number of tables'
                type='number'
                value={newTable}
                onChange={e=>setNewTable(e.target.value)}
            />
            <button className='button1'>
                Create Table
            </button>
        </form>
      </section>
      <section>
        <h1>List of tables</h1>
        {tablelist.length < 1 && <h3>No tables set</h3>}
        <div className='tables'>
        {tablelist.length > 0 && 
            tablelist.map(table => <ViewTable key={table._id}
                id={table._id}
                index={tablelist.indexOf(table)}
                num={table.number}
            />)
            }
        </div>
        
      </section>
    </div>
  )
}

export default SetupRestaurant
