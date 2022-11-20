import {createStore} from "redux";

let id = '';

{/**title, price, totalprice, quantity */}

export const addFood = (image, title, price, totalPrice, quantity) =>{
    return{
        type : "ADD",
        image, 
        title,
        price,
        totalPrice,
        quantity,
    };
};

export const deleteFood = (id) =>{
    return{
        type : "DELETE",
        id : parseInt(id)
    };
};


export const reducer = (food = [], action) =>{
    console.log(food);
    switch(action.type){
        case "ADD" : {
            return [
                {
                    image : action.image,
                    title : action.title,
                    price : action.price,
                    totalPrice : action.totalPrice,
                    quantity : action.quantity,
                    id : Date.now(),
                }, ...food
            ]
        }
        case "DELETE" : {
            return food.filter(minusFood => minusFood.id !== action.id);
        }
        default:
            return food; 
    }
}

const store = createStore(reducer);

export default store;