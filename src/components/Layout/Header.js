import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function renderLogin() {
    let xx = JSON.parse(localStorage.getItem("login"));

    if (xx) {
      return (
        <li>
          <a onClick={Logout}>
            <i className="fa fa-lock" />
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/login">
            <i className="fa fa-lock" />
            Login
          </Link>
        </li>
      );
    }
  }
  function Logout() {
    localStorage.clear();
    {
      navigate("/login");
    }
  }
  function Account() {
    let x = JSON.parse(localStorage.getItem("login"));

    if (!x) {
      return (
        <li>
          <Link to="/login">
            <i className="fa fa-lock" />
            Account
          </Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/account/update">
            <i className="fa fa-lock" />
            Account
          </Link>
        </li>
      );
    }
  }
  function showCart() {
    let y = JSON.parse(localStorage.getItem("cartt"));
    let z = JSON.parse(localStorage.getItem("wishqty"));
    return (
      <>
        <li>
          <Link to="/whist">
            <i className="fa fa-star" /> Wishlist {z}
          </Link>
        </li>
        <li>
          <Link to="checkout.html">
            <i className="fa fa-crosshairs" /> Checkout
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="fa fa-shopping-cart" /> Cart{y}
          </Link>
        </li>
      </>
    );
  }

  return (
    <div>
      <header id="header">
        {/*header*/}
        <div className="header_top">
          {/*header_top*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <Link to="/homereducer">
                        <i className="fa fa-phone" /> +2 95 01 88 821
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-envelope" /> info@domain.com
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to>
                        <i className="fa fa-facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-linkedin" />
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-dribbble" />
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-google-plus" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/header_top*/}
        <div className="header-middle">
          {/*header-middle*/}
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to="/home">
                    <img src="./frontend/images/home/logo.png" alt="" />
                  </Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to>Canada</Link>
                      </li>
                      <li>
                        <Link to>UK</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to>Canadian Dollar</Link>
                      </li>
                      <li>
                        <Link to>Pound</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    {Account()}
                    {showCart()}
                    {renderLogin()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/header-middle*/}
        <div className="header-bottom">
          {/*header-bottom*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li className="dropdown">
                      <Link to="#">
                        Shop
                        <i className="fa fa-angle-down" />
                      </Link>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="shop.html">Products</Link>
                        </li>
                        <li>
                          <Link to="product-details.html">Product Details</Link>
                        </li>
                        <li>
                          <Link to="checkout.html">Checkout</Link>
                        </li>
                        <li>
                          <Link to="cart.html">Cart</Link>
                        </li>
                        <li>
                          <Link to="login.html">Login</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <Link to="#" className="active">
                        <Link to="/blog">Blog</Link>
                        <i className="fa fa-angle-down" />
                      </Link>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="blog.html" className="active">
                            Blog List
                          </Link>
                        </li>
                        <li>
                          <Link to="blog-single.html">Blog Single</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="404.html">404</Link>
                    </li>
                    <li>
                      <Link to="contact-us.html">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/header-bottom*/}
      </header>
      {/*/header*/}
    </div>
  );
}
export default Header;
