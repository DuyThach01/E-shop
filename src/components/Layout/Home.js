import React, { Children, useContext, useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import { addNewhobby } from "../../action/hobby";
import apiRequest from "../../api/apiRequest";
import { UserContext } from "../../UserContext";
import { useDispatch } from "react-redux";

function Home(props) {
  const [product, setProduct] = useState("");

  const dispatch = useDispatch();
  // const data1 = useContext(UserContext);

  useEffect(() => {
    apiRequest
      .get("/product")
      .then((re) => {
        setProduct(re.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function moreproduct(e) {
    localStorage.setItem("more", JSON.stringify(e.target.id));
  }

  const xx = useContext(UserContext);
  function cart(e) {
    let id = e.target.id;
    let obj = {};

    let getlocal = localStorage.getItem("cart");
    let qty = 1;
    if (getlocal) {
      obj = JSON.parse(getlocal);
      if (obj[id]) {
        qty = obj[id] + 1;
      }
    }
    obj[id] = qty;

    let sumQty = 0;
    Object.keys(obj).map((key, index) => {
      sumQty = sumQty + obj[key];
    });

    // lay sumQty dua vao context thử xem
    const action = addNewhobby(sumQty);
    dispatch(action);

    localStorage.setItem("cart", JSON.stringify(obj));
  }
  let objwish = [];
  function whist(e) {
    let a = e.target.id;

    let getlocalwish = localStorage.getItem("whist");
    if (getlocalwish) {
      objwish = JSON.parse(getlocalwish);
      if (objwish.includes(a)) {
      } else {
        objwish.push(a);
      }
    } else {
      objwish.push(a);
    }

    xx.Qtywish(objwish.length);
    localStorage.setItem("whist", JSON.stringify(objwish));
  }

  function deletewhist(e) {
    let a = e.target.id;
    let new_arr = [];
    let getlocalwish = localStorage.getItem("whist");
    if (getlocalwish) {
      objwish = JSON.parse(getlocalwish);

      new_arr = objwish.filter((item) => item !== a);
    }
    xx.Qtywish(new_arr.length);
    localStorage.setItem("whist", JSON.stringify(new_arr));
    // data1.Qtywish(d);
  }

  function Showproducthome() {
    if (product) {
      return product.map((value, index) => {
        let link1 = "http://localhost/laravel/public/api/product/";

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
                    <Link
                      to="#"
                      className="btn btn-default add-to-cart"
                      id={value.id}
                      onClick={cart}
                    >
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <Link to="#" id={value.id} onClick={whist}>
                      <i className="fa fa-shopping-cart" />
                      Add to whist
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/detailproduct"
                      id={value.id}
                      onClick={moreproduct}
                    >
                      <i className="fa fa-plus-square" />
                      More
                    </Link>
                  </li>
                  <li>
                    <Link to="#" id={value.id} onClick={deletewhist}>
                      Delete whist
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
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Features Items</h2>
          {Showproducthome()}
        </div>
      </div>
    </>
  );
}
export default Home;
