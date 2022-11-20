import logo from './logo.svg';
import './App.css';
import {Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage.jsx"
import Cart from "./HomePage/Component/CartComponent.jsx";
import Pay from "./HomePage/Component/PayComponent.jsx"
import Finish from "./HomePage/Component/FinishComponent";

function App() {
  return (
  <Routes>
    <Route exact path="/" element={<HomePage />} />
    <Route path = "/cart/:id" element = {<Cart />}/>
    <Route path = "/pay" element = {<Pay />}/>
    <Route path = "/finish" element = {<Finish />}/>
  </Routes>
  );
}

export default App;
