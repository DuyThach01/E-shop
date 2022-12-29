import React, { useEffect, useState } from "react";
import apiRequest from "../../api/apiRequest";
function Register() {
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    level: "0",
  });
  const [Error, setError] = useState({});
  const [avatar, setavatar] = useState("");
  const [getFile, setFile] = useState("");

  function handleInput(e) {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setinput((state) => ({ ...state, [nameInput]: valueInput }));
  }
  function hanldeFile(e) {
    const file = e.target.files;

    let reader = new FileReader();
    reader.onload = (e) => {
      setavatar(file);
      setFile(e.target.result);
      console.log(File);
    };
    reader.readAsDataURL(file[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let error = {};
    let flag = true;
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.name === "") {
      error.name = "vui long nhap ten";
      flag = false;
    }
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
    if (input.phone === "") {
      error.phone = "vui long nhap so dien thoai";
      flag = false;
    }
    if (input.address === "") {
      error.address = "vui long nhap so dia chi";
      flag = false;
    }
    if (input.level === "") {
      error.level = "vui long chon level";
      flag = false;
    }
    if (avatar === "") {
      error.avatar = "vui long nhap avatar";
      flag = false;
    } else {
      let sizze = avatar[0].size;
      if (sizze > 1024 * 1024) {
        error.size = "file vuot qua dung luong";
        flag = false;
      } else {
        let text = avatar[0].name;
        const myArray = text.split(".");
        let arr = ["png", "jpg", "jpeg", "PNG", "JPG"];
        if (!arr.includes(myArray[1])) {
          error.type = "loại file ko phù hợp";
          flag = false;
        }
      }
    }
    if (flag) {
      input.avatar = getFile;
      apiRequest
        .post("http://localhost/laravel/public/api/register", input)
        .then((re) => {
          if (re.data.errors) {
            alert("Tai khoan đã tồn tại");
          } else {
            alert("Đăng ký thành công");
          }
        });
    } else {
      setError(error);
    }
  }
  function showError() {}

  return (
    <div>
      <div className="signup-form">
        {/*sign up form*/}
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInput}
          />
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
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            onChange={handleInput}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleInput}
          />
          <input type="file" name="file" onChange={hanldeFile} />
          <input
            type="number"
            name="level"
            placeholder="Level"
            onChange={handleInput}
          />
          <button type="submit" className="btn btn-default">
            Đăng ký
          </button>
        </form>
      </div>
      <div>{showError}</div>
    </div>
  );
}
export default Register;
