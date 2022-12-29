import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
function Cart() {
  const y = JSON.parse(localStorage.getItem("user"));
  const [x, setx] = useState("");
  let q = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("cart"));
    console.log(h);

    apiRequest
      .post("/product/cart", h)
      .then((re) => {
        setx(re.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function math(e) {
    let a = e.target.name;

    let c = e.target.id;

    if (x) {
      return x.map((value, index) => {
        if (c == value.id) {
          if (a == "add") {
            value.qty++;
            q[value.id] = value.qty;
          } else {
            value.qty--;
            q[value.id] = value.qty;
          }
          localStorage.setItem("cart", JSON.stringify(q));
          apiRequest
            .post("/product/cart", q)
            .then((re) => {
              setx(re.data.data);
            })
            .catch((error) => console.log(error));
        }
      });
    }
  }

  function deletee(e) {
    let a = e.target.id;
    delete q[a];
    console.log(q);
    localStorage.setItem("cart", JSON.stringify(q));
    apiRequest
      .post("/product/cart", q)
      .then((re) => {
        setx(re.data.data);
      })
      .catch((error) => console.log(error));
  }

  function showCart() {
    if (x) {
      return x.map((value, index) => {
        let link1 =
          "http://localhost/laravel/public/upload/user/product/" +
          y.Auth.id +
          "/";
        let str = value.image;

        let link21 = str.replace('["', "");
        let link22 = link21.replace('"]', "");
        let arr = link22.split('","');
        let link = link1.concat(arr[0]);

        return (
          <tr>
            <td className="cart_product">
              <a href>
                <img className="image5" src={link} alt="" />
              </a>
            </td>
            <td className="cart_description">
              <h4>
                <a href>{value.name}</a>
              </h4>
              <p>Web ID:{value.wed_id}</p>
            </td>
            <td className="cart_price">
              <p>${value.price}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <a
                  id={value.id}
                  name="add"
                  className="cart_quantity_up"
                  href
                  onClick={math}
                >
                  +
                </a>
                <input
                  className="cart_quantity_input"
                  type="text"
                  name="quantity"
                  defaultValue={"1"}
                  autoComplete="off"
                  size={2}
                  value={x[index].qty}
                />
                <a
                  id={value.id}
                  name="sub"
                  className="cart_quantity_down"
                  href
                  onClick={math}
                >
                  -
                </a>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price">${value.price * value.qty}</p>
            </td>
            <td className="cart_delete">
              <a className="cart_quantity_delete" href>
                <i id={value.id} className="fa fa-times" onClick={deletee} />
              </a>
            </td>
          </tr>
        );
      });
    }
  }

  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <Link to="home">Home</Link>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
              </thead>
              <tbody>{showCart()}</tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href>
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul className="mm">
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span className="tt">{}</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Update
                </a>
                <a className="btn btn-default check_out" href>
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
