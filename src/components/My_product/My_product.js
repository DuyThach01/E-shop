import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import { useEffect } from "react";
function My_product() {
  const y = JSON.parse(localStorage.getItem("user"));

  const [product, setproduct] = useState([]);
  useEffect(() => {
    let url = "/user/my-product";
    let accessToken = y.success.token;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    apiRequest
      .get(url, config)
      .then((re) => {
        setproduct(re.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function deletee(e) {
    let accessToken = y.success.token;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };

    apiRequest
      .get(
        "http://localhost/laravel/public/api/user/delete-product/" +
          e.target.id,
        config
      )
      .then((re) => {
        setproduct(re.data.data);
      });
  }
  function edit(e) {
    localStorage.setItem("edit", JSON.stringify(e.target.id));
  }
  function showProduct() {
    if (Object.keys(product).length > 0) {
      let link1 =
        "http://localhost/laravel/public/upload/user/product/" +
        y.Auth.id +
        "/";
      // console.log(product);
      return Object.keys(product).map((value, index) => {
        let str = product[value].image;
        let link21 = str.replace('["', "");
        let link2 = link21.replace('"]', "");
        let arr = link2.split('","');
        let link = link1.concat(arr[0]);

        return (
          <tr className="cart_menu">
            <td className="image2">{product[value].id}</td>
            <td className="description">{product[value].name}</td>
            <td className="image">
              <img className="image1" src={link} />
            </td>
            <td className="price">{product[value].price}</td>
            <td className="quantity">
              <Link
                to="/account/editproduct"
                id={product[value].id}
                onClick={edit}
              >
                Edit
              </Link>
            </td>
            <td>
              <i
                id={product[value].id}
                onClick={deletee}
                className="fa fa-times"
              ></i>
            </td>
          </tr>
        );
      });
    }
  }
  return (
    <div className="col-sm-9">
      <table className="table table-condensed">
        <thead>
          <tr className="cart_menu">
            <td className="image">ID</td>
            <td className="description">Name</td>
            <td className="image">Image</td>
            <td className="price">Price</td>
            <td className="quantity">Action</td>
          </tr>
        </thead>
        <tbody>{showProduct()}</tbody>
        <tfoot>
          <button>
            <Link to="/account/newproduct">ADD PRODUCT</Link>
          </button>
        </tfoot>
      </table>
    </div>
  );
}
export default My_product;
