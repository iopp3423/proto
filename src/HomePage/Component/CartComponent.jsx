import React, {useState, useEffect} from "react";
import Api from "../../Api.json";
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import {addFood} from "../../Store";
import {useDispatch} from 'react-redux';


const Image = {
    cart : require('../../ImageSource/cart.png'),
    banner : require('../../ImageSource/banner.jpg'),
    salmon : require('../../ImageSource/salmon.jpg'),
    hamburger : require('../../ImageSource/hamburger.jpg'),
    back : require('../../ImageSource/back.png'),
    review : require('../../ImageSource/review.jpg'),
}

const styles = {
    hidden : {
    opacity: "0",
    visibility: "hidden",
    transition: "opacity 500ms , visibility 500ms",
  },
}
  
const Cart = () =>{
    const dispatch = useDispatch();
    const params = useParams();

    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(Api[params.id].price);

    const plus = () =>{
        setQuantity(prevNumber => prevNumber + 1);
    }
    const minus = () =>{
        if(quantity > 1){
            setQuantity(prevNumber => prevNumber - 1);
        }
    }
    useEffect(()=>{
        setTotalPrice(parseInt(Api[params.id].price) * quantity);
    }, [plus, minus])

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const [Cart, setCart] = useState(true);

    {/**title, price, totalprice, quantity */}

    const getCart = () =>{
        setCart(false);
        dispatch(addFood(Api[params.id].menuImage, Api[params.id].title, Api[params.id].price, totalPrice, quantity));
    }

    return(
        <div className = "main-container">
            <div id = "menuContainer">
                <img src = {Api[params.id].menuImage} id = "cartImage"/>

                <div id = "back">
                    <Link to = {`/`}>
                        <img src = {Image.back} style = {{width : "100%", height : "100%"}}/>
                    </Link>
                </div>
                <div id = "orderContainer">
                    <div id = "orderSecondContainer">

                    <div id = "menuInformationContainer">
                        <div id = "menuTitle">{Api[params.id].title}</div>
                        <div id = "ingredient">??????</div>
                        <div id = "ingredientInfor">?????????, ??????</div>
                    </div>

                    <div id = "priceContainer">
                        <div id = "price">?????? : {Api[params.id].price}???</div>
                        <div id = "quantity">?????? :&nbsp;
                        <button className = "minusButton" onClick = {minus}>-</button>
                        <div id = "quantityText">{quantity}</div>
                        <button className = "plusButton" onClick = {plus}>+</button>
                        </div>
                        <div id = "totalPrice">??? ???????????? : {totalPrice}</div>
                    </div>

                    <Link to = {`/`}>
                    <button id = "cartButton" onClick = {getCart}>???????????? ??????</button>
                    </Link>
                    <img src = {Image.review} style = {{width : "100%", height : "400px", marginTop : "40px"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;