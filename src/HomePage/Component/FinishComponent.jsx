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

function Pay({cartList}){
    const dispatch = useDispatch();
    const date = new Date();
    let totalOrderCost = 0;

    const [orderCost, setOrderCost] = useState();

    const costCaculate = () =>{
        cartList.map((list, index)=>{
            totalOrderCost += parseInt(list.price);
        })
        setOrderCost(totalOrderCost);
        totalOrderCost = 0;
    }
    useEffect(()=>{
        costCaculate();
        window.scrollTo(0, 0);
    }, [])
    return(
        <div class = "main-container">
            <div id = "pay-top-container">
                <Link to = {`/pay`}>
                <img src = {Image.backCart} id = "backCartImage"/>
                </Link>
                <div id = "payTopText">결제하기</div>
                <Link to = {`/`}>
                <img src = {Image.home} id = "backHome"/>
                </Link>
            </div>
            <div id = "orderPageContainer">
                <div id = "orderTopContainer">
                    <div id = "orderFinishText">주문이 완료되었어요</div>
                    <div id = "orderPlaceText">포스코 인재창조원 송도점</div>
                    <div id = "orderTotalText">{cartList[0].title} 외 {cartList.length}개</div>
                    <div id = "orderClockText">주문일시 : {date.getHours()}시 {date.getMinutes()}분</div>
                    <div id = "orderNumberText">주문번호 : {Date.now()}</div>
                </div>
                <div id = "orderBottomContainer">
                    {cartList.map((list)=>{
                        return <div id = "orderListBottomContainer">
                            <div>{list.title} {list.quantity}개</div>
                            <div>{list.price}</div>
                            </div>
                    })}
                <div id = "orderBottomCost">
                    <div id = "orderTotalCostContainer">
                        <div>총 주문금액 </div>
                        <div>{orderCost}원</div>
                    </div>
                    <div id = "orderSaleCostContainer">
                        <div>할인금액</div>
                        <div>-2000원</div>
                    </div>
                    <hr/>
                    <div id = "orderCost">
                        <div>총 결제금액</div>
                        <div>{orderCost-2000}</div>
                    </div>
                </div>
                </div>
            </div>
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