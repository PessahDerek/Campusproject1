import axios from 'axios';
import React, { useRef, useState } from 'react'
import './admComp.css'
import { add_tables, deleteTable, generateId, gettablelist, getTables, onApi } from '../../Functions/Func1';
import Spinner from '../../Componets/Spinner';
import { useEffect } from 'react';
import ViewTable from './ViewTable';
import PrintQr from './PrintQr';
import { Route, Routes } from 'react-router-dom';
import Printpage from './Printpage';

const SetupRestaurant = () => {
    const loaded = useRef(0)
    const [showPrint, setShowPrint] = useState(false)
    const [message, setMessage] = useState("");
    const [spin, setSpin] = useState(false);
    const [newTable, setNewTable] = useState("");
    const [tablelist, setTableList] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(()=>{
        function load(){
           let x = getTables(setTableList)
            x.then(res=>{
                if (res.err) setMessage(res.message)
            }) 
        }
        loaded.current += 1;
        if (loaded.current <= 1){
            load()
        }
    }, [tablelist])

    const del_table = (id) =>{
        let array = [];
        let delElem;
        for (let element of tablelist){
            if (element._id !== id) array.push(element);
            if (element._id === id) delElem = element;
            console.log(element.number)
        }
        setTableList(array)
        deleteTable(delElem._id)
        .then(res=>{
            console.log(res)
        })
    }

    const addDefaults = async (e) =>{
        e.preventDefault()
        if (!newTable) return;
        setSpin(true)
        let prom = axios.post(onApi+"/registertables", ({count: newTable}))
        prom.then((res)=>{
            if (res.data.err){
                setSpin(false);
                return;
            }
            setSpin(false);
            getTables(setTableList);
        }, err=>{
            setSpin(false);
            setMessage(err.message);
        })
        .catch(err=>{
            setMessage(err.message);
            setSpin(false);
        })
    }
  return (
    <div className='setupRestPage'>
        {showPrint  && <PrintQr 
            array={tablelist}
            hide={setShowPrint}
        />}
      <section>
        {spin && <Spinner />}
        <form className='addTableForm' onSubmit={addDefaults}>
            <h1>Add Tables</h1>
            <p>Number of tables to add</p>
            <input 
                className='inp1'
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
        <h1>List of tables <button className='button1' onClick={()=>setShowPrint(true)} >Print</button></h1>
        {tablelist.length < 1 && <h3>{message ? `${message}` : "No tables set"}</h3>}
        <div className='tables'>
        {tablelist.length > 0 && 
            tablelist.map(table => <ViewTable key={table._id}
                id={table._id}
                index={tablelist.indexOf(table)}
                num={table.number}
                array={tablelist}
                delete={del_table}
                qrCode={table.qr_code}
            />)
            }
        </div>
      </section>
    </div>
  )
}

export default SetupRestaurant
