import React, { useEffect, useState } from "react";

import Detail from "../blogs/Detail";
import apiRequest from "../../api/apiRequest";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Detailproduct() {
  const x = JSON.parse(localStorage.getItem("more"));
  const y = JSON.parse(localStorage.getItem("user"));
  const [detail, setDetail] = useState("");
  const [linkkk, setlinkkk] = useState("");

  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    apiRequest.get("/product/detail/" + x).then((re) => {
      setDetail(re.data.data);
      console.log(re.data.data);
    });
  }, []);
  function brand() {
    if (detail.id_brand == 1) {
      return "Category 1";
    }
    if (detail.id_brand == 2) {
      return "Category 2";
    }
    if (detail.id_brand == 3) {
      return "Vietnam";
    }
  }
  function showimg(e) {
    setlinkkk(e.target.src);
    console.log(e.target.src);
  }
  function showimage() {
    if (linkkk) {
      return (
        <div className="view-product">
          <img src={linkkk} alt="" />
        </div>
      );
    } else {
      let link1 =
        "http://localhost/laravel/public/upload/user/product/" +
        y.Auth.id +
        "/";
      let str = detail.image;
      if (str) {
        let link21 = str.replace('["', "");
        let link22 = link21.replace('"]', "");
        let arr = link22.split('","');
        setlinkkk(link1.concat(arr[0]));
        return (
          <div className="view-product">
            <img src={linkkk} alt="" />
          </div>
        );
      }
    }
  }
  function link() {
    let link1 =
      "http://localhost/laravel/public/upload/user/product/" + y.Auth.id + "/";
    let str = detail.image;
    if (str) {
      let link21 = str.replace('["', "");
      let link22 = link21.replace('"]', "");
      let arr = link22.split('","');
      let link = link1.concat(arr[0]);

      let link11 = link1.concat(arr[1]);
      let link12 = link1.concat(arr[2]);

      return (
        <div className="col-sm-5">
          {showimage()}
          <div
            id="similar-product"
            className="carousel slide"
            data-ride="carousel"
          >
            {/* Wrapper for slides */}
            <div className="carousel-inner">
              <div className="item active">
                <a href>
                  <img className="image4" src={link} alt="" onClick={showimg} />
                </a>
                <a href>
                  <img
                    className="image4"
                    src={link11}
                    alt=""
                    onClick={showimg}
                  />
                </a>
                <a href>
                  <img
                    className="image4"
                    src={link12}
                    alt=""
                    onClick={showimg}
                  />
                </a>
              </div>
              {/* <div className="item">
                <a href>
                  <img className="image4" src={link} alt="" />
                </a>
                <a href>
                  <img className="image4" src={link11} alt="" />
                </a>
                <a href>
                  <img className="image4" src={link12} alt="" />
                </a>
              </div>
              <div className="item">
                <a href>
                  <img className="image4" src={link} alt="" />
                </a>
                <a href>
                  <img className="image4" src={link11} alt="" />
                </a>
                <a href>
                  <img className="image4" src={link12} alt="" />
                </a>
              </div> */}
            </div>
            {/* Controls */}
            <a
              className="left item-control"
              href="#similar-product"
              data-slide="prev"
            >
              <i className="fa fa-angle-left" />
            </a>
            <a
              className="right item-control"
              href="#similar-product"
              data-slide="next"
            >
              <i className="fa fa-angle-right" />
            </a>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="product-details">
      {link()}
      <div className="col-sm-7">
        <div className="product-information">
          {/*/product-information*/}
          <img
            src="images/product-details/new.jpg"
            className="newarrival"
            alt=""
          />
          <h2>{detail.name}</h2>
          <p>{detail.id}</p>
          <img src="images/product-details/rating.png" alt="" />
          <span>
            <span>US ${detail.price}</span>
            <label>Quantity:</label>
            <input type="text" defaultValue={3} />
            <button type="button" className="btn btn-fefault cart">
              <i className="fa fa-shopping-cart" />
              Add to cart
            </button>
          </span>
          <p>
            <b>Availability:</b> In Stock
          </p>
          <p>
            <b>Condition:</b>
            {detail.status == 1 ? "New" : "Sale"}
          </p>
          <p>
            <b>Brand:</b> {brand()}
          </p>
          <a href>
            <img
              src="images/product-details/share.png"
              className="share img-responsive"
              alt=""
            />
          </a>
        </div>
        {/*/product-information*/}
      </div>
    </div>
  );
}
export default Detailproduct;
