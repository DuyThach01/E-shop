import React from "react";
import Login from "./Login";
import Register from "./Register";
function Formlogin(){
    return(
        <>
          <section id="form">{/*form*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-1">
            <div className="signup-form">{/*sign up form*/}
              <Register />
            </div>{/*/sign up form*/}
            </div>
            <div className="col-sm-1">
              <h2 className="or">OR</h2>
            </div>
            <div className="col-sm-4">
              <Login />
            </div>
          </div>
        </div>
      </section>{/*/form*/}
        </>
    )
}
export default Formlogin;