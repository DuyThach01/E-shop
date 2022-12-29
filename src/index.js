import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import Blog from "./components/blogs/Blogs";
import Detail from "./components/blogs/Detail";
import Register from "./components/member/Register";
import Formlogin from "./components/member/Index";
import Home from "./components/Layout/Home";
import Account from "./components/Account/Account";
import New_product from "./components/My_product/Newproduct";
import My_product from "./components/My_product/My_product";
import Editproduct from "./components/My_product/Editproduct";
import Detailproduct from "./components/My_product/Detailproduct";
import Cart from "./components/My_product/Cart";
import Whist from "./components/My_product/Whist";
import { Provider } from "react-redux";
import store from "./store";
import Index from "./page/homepage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Formlogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account/update" element={<Account />} />
            <Route path="/account/myproduct" element={<My_product />} />
            <Route path="/account/newproduct" element={<New_product />} />
            <Route path="/account/editproduct" element={<Editproduct />} />
            <Route path="/detailproduct" element={<Detailproduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/whist" element={<Whist />} />
            <Route path="/homereducer" element={<Index />} />
          </Routes>
        </App>
      </Router>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
