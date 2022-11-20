import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Api from "../../Api.json";
import {Link} from "react-router-dom";
import StickyBox from "react-sticky-box";
import {deleteFood} from "../../Store";
import {useDispatch} from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const Image = {
    cart : require('../../ImageSource/cart.png'),
    banner : require('../../ImageSource/banner.jpg'),
    salmon : require('../../ImageSource/salmon.jpg'),
    home : require('../../ImageSource/home.png'),
    backCart : require('../../ImageSource/backCart.png'),
}
const deleteMenu = () =>{

}

function Pay({cartList}){
    const dispatch = useDispatch();

    let temp = [];
    for(let index = 0; index < cartList.length; index++){
        temp.push(cartList[index].quantity);
    }
    const [quantity, setQuantity] = useState(temp);

    const [payText, setPayText] = useState('현장결제');
    const [finalPrice, setFinalPrice] = useState(0);
    const [minusMenu, setMinusMenu] = useState();

    const plus = (index) =>{
        //setQuantity(cartList[index].quantity);
        temp[index] = temp[index] + 1;
        const tempQuantity = temp;
        setQuantity(tempQuantity);
        console.log(temp[index] + 1);
        console.log(temp);
    }
    const minus = () =>{
        
    }

    const changePayText = (text) =>{
        console.log('asdasd');
        setPayText(text.toString());
        console.log(text);
        console.log('asdasd');
    }

    useEffect(()=>{
        let tempPrice = 0;
        cartList.map((list, index)=>{
            tempPrice += parseInt(list.price) * parseInt(list.quantity);
        })
        setFinalPrice(tempPrice);
    }, [minusMenu])
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return(
        <div class = "main-container">
            <div id = "pay-top-container">
                <Link to = {`/`}>
                <img src = {Image.backCart} id = "backCartImage"/>
                </Link>
                <div id = "payTopText">주문하기</div>
                <Link to = {`/`}>
                <img src = {Image.home} id = "backHome"/>
                </Link>
            </div>
            {cartList.map((list, index)=>{
                return <div key = {index} class = "pay-list-container">
                    <img src = {list.image} id = "pay-menu-image"/>
                    <div id = "payContentList">
                    <div id = "payMenuTitleContainer">
                        <div id = "payMenuTitle">
                            {list.title}
                        </div>
                        <button id = "canelButton" onClick={() => (dispatch(deleteFood(list.id)), setMinusMenu(Date.now()))}>X</button>
                    </div>
                    <div id = "payMenuPrice">가격 : {list.price}</div>
                    <div id = "payQuantityContainer">
                    <div id = "payQuantityTextTitle">수량 :</div>
                    <button class = "payMinus" onClick = {() => (minus(index))}>-</button>
                    <div id = "payQuantityText">{quantity[index]}</div>
                    <button class = "payPlus" onClick = {() => (plus(index))}>+</button>
                    </div>
                        <div id = "payOrderPrice">주문금액 : {list.totalPrice}</div>
                    </div>
                </div>
            })}
                <div id = "finalPriceContainer">
                    <div id = "finalPriceTextQ">총 결제금액 : </div>
                    <div id = "finalPriceTextA">{finalPrice}원</div>
                </div>
                <DropdownButton id="dropdown-basic-button" title={payText}>
                <div onClick = {() => (changePayText('현장결제'))} class = "payWay">현장결제</div>
                <div onClick = {() => (changePayText('네이버페이'))} class = "payWay">네이버페이</div>
                <div onClick = {() => (changePayText('카카오페이'))} class = "payWay">카카오페이</div>
                </DropdownButton>

                <Link to = {`/finish`}>
                    <button id = "payButton">결제하기</button>  
                </Link>
        </div>
    );
}

{/** 여기서 리턴하면 store로 보내짐 */}
function mapDispatchToProps(dispatch){
    {/** props */}
     return {dispatch}
}

{/** 스토어에서 정보 가져오는 코드 */}
function mapStateToProps(food){
    {/** props */}
    return {
        cartList : food
    };
}

export default connect(mapStateToProps, null)(Pay)