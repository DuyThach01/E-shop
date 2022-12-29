import React from "react";
import { useState } from "react";
import apiRequest from "../../api/apiRequest";
function Account() {
  const y = JSON.parse(localStorage.getItem("user"));
  const [Error, setError] = useState({});
  const [avatar, setavatar] = useState("");
  const [getFile, setFile] = useState("");
  console.log(y);

  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
  });
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

    if (input.name === "") {
      error.name = "vui long nhap ten";
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
      let url = "/user/update/" + y.Auth.id;
      let accessToken = y.success.token;

      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", y.Auth.email);
      formData.append("password", input.password);
      formData.append("phone", input.phone);
      formData.append("address", input.address);
      formData.append("avatar", getFile);

      apiRequest.post(url, formData, config).then((re) => {
        alert("Cap nhat thanh cong");
      });
    } else {
      setError(error);
    }
  }

  return (
    <div className="col-sm-9">
      <section>
        {/*form*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="signup-form">
                {/*sign up form*/}
                <h2>Update Infomation!</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder={y.Auth.name}
                    onChange={handleInput}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={y.Auth.email}
                    onChange={handleInput}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInput}
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder={y.Auth.address}
                    onChange={handleInput}
                  />
                  <input
                    type="number"
                    name="phone"
                    placeholder={y.Auth.phone}
                    onChange={handleInput}
                  />
                  <input type="file" name="file" onChange={hanldeFile} />
                  <button type="submit" className="btn btn-default">
                    Update
                  </button>
                </form>
              </div>
              {/*/sign up form*/}
            </div>
          </div>
        </div>
      </section>
      {/*/form*/}
    </div>
  );
}
export default Account;
