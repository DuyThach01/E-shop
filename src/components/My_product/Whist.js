import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { Children, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import { UserContext } from "../../UserContext";
function Whist() {
  const x = JSON.parse(localStorage.getItem("whist"));
  const y = JSON.parse(localStorage.getItem("user"));

  const [wish, setWish] = useState("");
  useEffect(() => {
    apiRequest.get("/product/wishlist").then((re) => {
      setWish(re.data.data);
    });
  }, []);
  let k = [];
  function allwishlist() {
    if (x) {
      x.map((value1, index1) => {
        Object.values(wish).map((value, index) => {
          if (value.id == value1) {
            k.push(value);
          }
        });
      });
    }
  }
  const xx = useContext(UserContext);
  function remove(e) {
    let a = e.target.id;
    let objwish = [];
    let new_arr = [];
    let getlocalwish = localStorage.getItem("whist");
    if (getlocalwish) {
      objwish = JSON.parse(getlocalwish);

      new_arr = objwish.filter((item) => item !== a);
    }

    xx.Qtywish(new_arr.length);
    localStorage.setItem("whist", JSON.stringify(new_arr));
  }

  function Showproductwishlist() {
    if (k) {
      return k.map((value, index) => {
        let link1 =
          "http://localhost/laravel/public/upload/user/product/" +
          y.Auth.id +
          "/";

        let str = value.image;
        let link21 = str.replace('["', "");
        let link2 = link21.replace('"]', "");
        let arr = link2.split('","');
        let link = link1.concat(arr[0]);

        return (
          <div className="col-sm-4" id="pr1">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img src={link} alt="" />
                  <h2 className="a">${value.price}</h2>
                  <p className="b">{value.name}</p>
                  <Link to="#" className="btn btn-default add-to-cart x">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </Link>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>
                      $<span>{value.price}</span>
                    </h2>
                    <p>{value.name}</p>
                    <Link to="#" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <Link to="#" id={value.id} onClick={remove}>
                      Remove
                    </Link>
                  </li>

                  <li>
                    <Link to="/detailproduct">
                      <i className="fa fa-plus-square" />
                      More
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  return (
    <>
      {allwishlist()}
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Features Items</h2>
          {Showproductwishlist()}
        </div>
      </div>
    </>
  );
}
export default Whist;
