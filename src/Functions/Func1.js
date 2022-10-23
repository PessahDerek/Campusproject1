import axios from "axios";
import AddFlavor from "../Admin/Components/AddFlavor";
import AddPrice from "../Admin/Components/AddPrice";

export let onApi = 'http://localhost:4000/api'

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
    await axios.get(onApi +'/gettablelist')
    .then(res=>{
        func(res.data);
    }, err=>{
        console.log(err.message)
    })
    .catch(err=>{
        console.log(err.message)
    })
    
}

export const deleteTable = async(id) =>{
    await axios.delete(onApi+'/deletetable', id)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}


export default (onApi, generateId, getWidget, addFoodToMenu, add_tables, getTables)