import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from 'react-redux';
import {connect} from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../HomePage.css"
import Api from "../../Api.json";
import {Link} from "react-router-dom";
import StickyBox from "react-sticky-box";

const Image = {
    cart : require('../../ImageSource/cart.png'),
    banner : require('../../ImageSource/banner.jpg'),
    salmon : require('../../ImageSource/salmon.jpg'),
    hamburger : require('../../ImageSource/hamburger.jpg'),
}

const HomePageComponent = ({cartList}) =>{
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
        }
      };

    const [api, setApi] = useState();
    
    const getFoodList = () =>{
        setApi(Api);
    }
    useEffect(()=>{
        getFoodList();
        payCheck();
    }, [])


    const [pay, setPay] = useState(true)
    const payCheck = () =>{
        if(cartList.length === 0){
            setPay(true);
        }
        else{
            setPay(false);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return(
        <div>
            <div id = "topContainer">
            <div id = "searchForm">
                <input id = "searchMenu"
                    type="text"
                    placeholder=" 검색어를 입력해주세요"
                    onKeyPress={handleSubmit}
                />
                <Link to = {`/pay`}>
                    <img src = {Image.cart} id = "cart"/>   
                </Link>
                             
                </div>
            </div>

            <div id = "storeIntroContainer">
                <img src = {Image.banner} id = "bannerImage"/>
            </div>

            <div id = "category">
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                className="mySwiper"
            >
            <SwiperSlide><button className = "category-choose">대표메뉴</button></SwiperSlide>
            <SwiperSlide><button className = "category-choose">세트메뉴</button></SwiperSlide>
            <SwiperSlide><button className = "category-choose">음료수</button></SwiperSlide>
            <SwiperSlide><button className = "category-choose">디저트</button></SwiperSlide>
            <SwiperSlide><button className = "category-choose">뭐넣지</button></SwiperSlide>
            </Swiper>
            </div>

            <div id = "topMenuContainer">
                <div id = "topMenuText">대표메뉴</div>
                <div id = "topMenuChoiceContainer">
                <Swiper
                slidesPerView={2}
                spaceBetween={10}
                className="mySwiper"
                >
            <SwiperSlide className = "topMenu">
            <div className = "food-image-container">
                <img src ={Image.salmon} className = "food-menu"/>
            </div>
                <div>연어</div>
                <div>15000원</div>
                </SwiperSlide>
            <SwiperSlide className = "topMenu">
                <div className = "food-image-container">
                    <img src ={Image.hamburger} className = "food-menu"/>
                </div>
                <div>햄버거</div>
                <div>5000원</div>
            </SwiperSlide>
            <SwiperSlide className = "topMenu">
                <div className = "food-image-container">
                    <img src ={Image.hamburger} className = "food-menu"/>
                </div>
                <div>햄버거</div>
                <div>5000원</div>
            </SwiperSlide>
            </Swiper>
                </div>
            </div>

            <div id = "topMenuContainer">
                <div id = "secondMenuText">추천메뉴</div>
                <div id = "topMenuChoiceContainer">
                <Swiper
                slidesPerView={2}
                spaceBetween={10}
                className="mySwiper"
                >
            <SwiperSlide className = "topMenu">
            <div className = "food-image-container">
                <img src ={Image.salmon} className = "food-menu"/>
            </div>
                <div>연어</div>
                <div>15000원</div>
                </SwiperSlide>
            <SwiperSlide className = "topMenu">
                <div className = "food-image-container">
                    <img src ={Image.hamburger} className = "food-menu"/>
                </div>
                <div>햄버거</div>
                <div>5000원</div>
            </SwiperSlide>
            <SwiperSlide className = "topMenu">
                <div className = "food-image-container">
                    <img src ={Image.hamburger} className = "food-menu"/>
                </div>
                <div>햄버거</div>
                <div>5000원</div>
            </SwiperSlide>
            </Swiper>
                </div>
            </div>

        <div id = "menu-list-container">   
        <div style = {{fontWeight:"bold", marginLeft : "10px"}}>피자</div>   
        {Api.map((menu, index)=>{
                return <Link to = {`/cart/${menu.id}`} key={index} id = "menu-container" >
                    <img src = {menu.menuImage} id = "menu-image"/>
                    <div id = "menuContent">
                    <div className = "menu-title">{menu.title}</div>
                    <div className = "menu-price">{menu.price}</div>
                    </div>
                    </Link>
            })}
            {pay ? '' : <StickyBox offsetTop={20} offsetBottom={20} bottom>
                <Link to = {`/pay`}>
                    <button id = "creditButton">결제하기</button>
                </Link>
            </StickyBox>}
            
        </div>
    </div>  
    );
}
{/** 스토어에서 정보 가져오는 코드 */}
function mapStateToProps(food){
    {/** props */}
    return {
        cartList : food
    };
}

export default connect(mapStateToProps, null)(HomePageComponent)
