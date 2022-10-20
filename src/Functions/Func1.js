import AddFlavor from "../Admin/Components/AddFlavor";
import AddPrice from "../Admin/Components/AddPrice";


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

export function addFoodToMenu(data){
    // pass
}

export default (generateId, getWidget, addFoodToMenu)