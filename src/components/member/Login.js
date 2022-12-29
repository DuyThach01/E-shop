import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";

function Login() {
  const [input, setinput] = useState({
    email: "",
    password: "",
    level: "0",
  });
  const [Error, setError] = useState({});
  const navigate = useNavigate();
  const [getXX, setXX] = useState(1);

  function handleInput(e) {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setinput((state) => ({ ...state, [nameInput]: valueInput }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let error = {};
    let flag = true;

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.email === "") {
      error.email = "vui long nhap email";
      flag = false;
    } else if (!re.test(input.email)) {
      error.email = "vui long nhap email";
      flag = false;
    }
    if (input.password === "") {
      error.password = "vui long nhap pass";
      flag = false;
    }

    if (flag) {
      apiRequest
        .post("http://localhost/laravel/public/api/login", input)
        .then((re) => {
          if (re.data.errors) {
            setError(re.data.errors);
          } else {
            localStorage.setItem("user", JSON.stringify(re.data));

            {
              navigate("/");
            }

            localStorage.setItem("login", JSON.stringify(getXX));

            alert("Đăng nhập thành công");
          }
        });
    } else {
      setError(error);
    }
  }
  function showError() {
    if (Object.keys(Error).length > 0)
      return Object.values(Error).map((value, key) => {
        return (
          <>
            <p>
              <strong>WARNING ! </strong>
              {value}
            </p>
          </>
        );
      });
  }

  return (
    <div>
      <div className="signup-form">
        {/*sign up form*/}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <button type="submit" className="btn btn-default">
            Đăng nhập
          </button>
          <div className="showerror">{showError()}</div>
        </form>
      </div>
      {/*/sign up form*/}
    </div>
  );
}
export default Login;
