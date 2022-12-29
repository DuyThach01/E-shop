import React from "react";
import { Link } from "react-router-dom";
function MenuAcc() {
  return (
    <div className="col-sm-3">
      <div className="left-sidebar">
        <div className="Acc">
          <ul className="Acc1">
            <li>Account</li>
          </ul>
          <ul className="Acc2">
            <li>
              {" "}
              <Link to="account/update"> Account</Link>
            </li>

            <li>
              <Link to="account/myproduct"> My_product</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default MenuAcc;
