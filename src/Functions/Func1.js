import axios from "axios";
import AddFlavor from "../Admin/Components/AddFlavor";
import AddPrice from "../Admin/Components/AddPrice";

let onApi = 'http://localhost:4000/api/addfood'

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

    await axios.post(onApi, form, {
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

export default (generateId, getWidget, addFoodToMenu)