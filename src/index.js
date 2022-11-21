import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from "./Store"
import { HashRouter, Switch, Route } from "react-router-dom";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {Store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
reportWebVitals();
