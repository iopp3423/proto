import React, {useState, useEffect} from "react";
import Api from "../../Api.json";
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {addFood} from "../../Store";
import {useDispatch} from 'react-redux';

const Image = {
    cart : require('../../ImageSource/cart.png'),
    banner : require('../../ImageSource/banner.jpg'),
    salmon : require('../../ImageSource/salmon.jpg'),
    hamburger : require('../../ImageSource/hamburger.jpg'),
    back : require('../../ImageSource/back.png'),
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
        <div class = "main-container">
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
                        <div id = "ingredient">재료</div>
                        <div id = "ingredientInfor">밀가루, 치즈</div>
                    </div>

                    <div id = "priceContainer">
                        <div id = "price">가격 : {Api[params.id].price}원</div>
                        <div id = "quantity">수량 :&nbsp;
                        <button class = "plusMinus" onClick = {minus}>-</button>
                        <div id = "quantityText">{quantity}</div>
                        <button class = "plusMinus" onClick = {plus}>+</button>
                        </div>
                        <div id = "totalPrice">총 주문금액 : {totalPrice}</div>
                    </div>

                    <Link to = {`/`}>
                    <button id = "cartButton" onClick = {getCart}>장바구니 담기</button>
                    </Link>
                    {Cart ?  '': 
                    <div id = "cartAlert">
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="success">
                            장바구니에 담겼습니다.
                        </Alert>
                    </Stack>
                    </div>}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;