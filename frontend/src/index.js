import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './layout/Header/Header';
import App from './App';
import Footer from './layout/Footer/Footer';
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />
    <App />
    <Footer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
