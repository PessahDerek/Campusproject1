import axios from "axios";
import AddFlavor from "../Admin/Components/AddFlavor";
import AddPrice from "../Admin/Components/AddPrice";

//export let onApi = 'https://servymenu.herokuapp.com/api'
export let onApi = "http://localhost:4000/api"

let ids = [""]

export function generateId(){
    let id = (Math.random() * 100);
    if (ids.includes(id)) generateId();
    ids.push(id);
    return id;
}

export function getWidget(type=''){
    if (type === 'flav') return {id: generateId(), elem: AddFlavor};
    return {id: generateId(), elem: AddPrice};
}

export async function addFoodToMenu(data){
    let form = new FormData();
    form.append('image', data.image);
    form.append('category', data.category);
    form.append('title', data.title);
    form.append('prices', data.prices)
    form.append('unit', data.unit);
    form.append('flavors', data.flavors);

    await axios.post(onApi+'/addfood', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(res=>{
            console.log("data: ", res.data)
            return res.data
        }, err=>{
            console.log("minor: ", err)
            return err.message
        })
        .catch(err=>{
            return {error: true, errMsg: err.message}
        })
}

export function purgeInputs(flav, size, quant, clicked){
    localStorage.removeItem(flav)
    localStorage.removeItem(size)
    localStorage.removeItem(quant)
    localStorage.removeItem(clicked)
}

export async function getFoods(){
    // pass
}

export async function add_tables(data){
    await axios.post(onApi+"/registertables", ({count: data}))
    .then((res)=>{
        return {err: false, message: res.data.message}
    }, err=>{
        return{err: true, message: err.message}
    })
    .catch(err=>{
        return {err: true, message: err.message}
    })
}

export async function getTables(func){
    let err = false;
    let resp;
    await axios.get(onApi +'/gettablelist')
    .then(res=>{
        func(res.data);
    }, error=>{
        err=true
        resp = {err: err, message: error.message}
    })
    .catch(error=>{
        console.log("lllll")
        return {err: err, message: error.message}
    })
    if (err) return resp
    return {err: false, message: ""}
}

export async function deleteTable(id){
    return new Promise((resolve, reject)=>{
        try {
            axios.delete(onApi+'/deletetable', id)
            .then(res=>{
                return resolve(true)
            })
        } catch (error) {
            return reject(false)
        }
    })
}

export function reducer(state, payload){
    return {quant: payload.payload};
}


export default (onApi, generateId, getWidget, addFoodToMenu, add_tables, getTables, reducer, purgeInputs)
