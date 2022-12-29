import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import apiRequest from "../../api/apiRequest";
function Editproduct() {
  const y = JSON.parse(localStorage.getItem("user"));
  const x = JSON.parse(localStorage.getItem("edit"));

  const [input, setinput] = useState({
    name: "",
    price: "",
    id_category: "",
    id_brand: "",
    company: "",
    detail: "",
    status: "",
    sale: "",
  });
  const [file, setFile] = useState("");
  const [Error, setError] = useState({});
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [picture, setPicture] = useState("");
  const deletepic = [];
  useEffect(() => {
    apiRequest
      .get("/category-brand")
      .then((re) => {
        setCategory(re.data.category);
        setBrand(re.data.brand);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    let url = "/user/product/" + x;
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
        setProduct(re.data.data);

        input.status = re.data.data.status;
        input.id_brand = re.data.data.id_brand;
        input.id_category = re.data.data.id_category;
        setPicture(re.data.data.image);
      })
      .catch((error) => console.log(error));
  }, []);
  function handleInput(e) {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setinput((state) => ({ ...state, [nameInput]: valueInput }));
  }
  function hanldeFile(e) {
    const a = e.target.files;

    setFile(a);
  }
  function showsale() {
    if (input.status == "1") {
      return (
        <input
          type="text"
          name="sale"
          placeholder={product.sale}
          onChange={handleInput}
        />
      );
    }
  }
  function showBrand() {
    if (brand) {
      return brand.map((value, index) => {
        return <option value={brand[index].id}>{brand[index].brand}</option>;
      });
    }
  }
  function showCategory() {
    if (category) {
      return category.map((value, index) => {
        return (
          <option value={category[index].id}>{category[index].category}</option>
        );
      });
    }
  }
  function checkbox(e) {
    let a = e.target.name;

    let b = 0;
    if (deletepic.length > 0) {
      console.log(1);
      deletepic.map((value3, index3) => {
        if (a === deletepic[index3]) {
          b = 1;
          deletepic.splice(index3, 1);
        }
      });
      if (b !== 1) {
        deletepic.push(a);
      }
    } else {
      deletepic.push(a);
    }

    console.log(deletepic);
  }
  function showimage() {
    if (picture) {
      let link1 =
        "http://localhost/laravel/public/upload/user/product/" +
        y.Auth.id +
        "/";
      return picture.map((value2, index2) => {
        let linkk = link1.concat(picture[index2]);

        return (
          <div className="showpic">
            <img className="image3" src={linkk} />
            <input type="checkbox" name={picture[index2]} onClick={checkbox} />
          </div>
        );
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let error = {};
    let flag = true;
    if (input.name === "") {
      error.name = "Vui long nhap ten san pham";
      flag = false;
    }
    if (input.price === "") {
      error.price = "Vui long nhap gia san pham";
      flag = false;
    }
    if (input.id_category === "") {
      error.id_category = "Vui long chon category";
      flag = false;
    }
    if (input.id_brand === "") {
      error.id_brand = "Vui long chon brand";
      flag = false;
    }
    if (input.company === "") {
      error.company = "Vui long chon cong ty";
      flag = false;
    }
    if (input.status === "") {
      error.status = "Vui long chon trang thai";
      flag = false;
    }
    if (input.status === 1) {
      if (input.sale === "") {
        error.sales = "Vui long nhap gia ";
        flag = false;
      }
    }
    if (input.detail === "") {
      error.detail = "Vui nhap thong tin chi tiet sp";
      flag = false;
    }

    if (file === "") {
      error.avatar = "Vui long nhap hinh anh san pham";
      flag = false;
    } else {
      if (file.length >= 4) {
        error.files = "ban da nhap vuot qua so luong file";
        flag = false;
      }

      Object.values(file).map((value, index) => {
        let sizze = value.size;
        if (sizze > 1024 * 1024) {
          error.size = "file vuot qua dung luong";
          flag = false;
        } else {
          let text = value.type;
          const myArray = text.split("/");
          let arr = ["png", "jpg", "jpeg", "PNG", "JPG"];
          if (!arr.includes(myArray[1])) {
            error.type = "loại file ko phù hợp";
            flag = false;
          }
        }
      });
    }

    if (flag) {
      let url = "/user/edit-product/" + x;
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
      formData.append("price", input.price);
      formData.append("category", input.id_category);
      formData.append("brand", input.id_brand);
      formData.append("company", input.company);
      formData.append("detail", input.detail);
      formData.append("status", input.status);
      formData.append("sale", input.sale);
      Object.keys(file).map((value1, index1) => {
        formData.append("file[]", file[index1]);
      });
      Object.keys(deletepic).map((value4, index4) => {
        console.log(deletepic[index4]);
        formData.append("avatarCheckBox[]", deletepic[index4]);
      });
      apiRequest.post(url, formData, config).then((re) => {
        console.log(re);
        if (re.data.errors) {
          setError(re.data.errors);
          console.log(Error);
        } else {
          alert("Update san pham thanh cong");
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
    <div className="col-sm-9">
      <section className="mypro">
        {/*form*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
              <div className="signup-form">
                <h2>Edit Product !</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder={product.name}
                    onChange={handleInput}
                  />
                  <input
                    type="text"
                    name="price"
                    placeholder={product.price}
                    onChange={handleInput}
                  />
                  <select
                    name="id_category"
                    value={input.id_category}
                    onChange={handleInput}
                  >
                    <option value="">Please choose category</option>
                    {showCategory()}
                  </select>
                  <select
                    name="id_brand"
                    value={input.id_brand}
                    onChange={handleInput}
                  >
                    <option value="">Please choose brand</option>
                    {showBrand()}
                  </select>
                  <select
                    name="status"
                    value={input.status}
                    onChange={handleInput}
                  >
                    <option value="">Status</option>
                    <option value="1">Sale</option>
                    <option value="2">New</option>
                  </select>

                  {showsale()}

                  <input
                    type="text"
                    name="company"
                    placeholder={product.company_profile}
                    onChange={handleInput}
                  />
                  <input
                    type="file"
                    name="file"
                    onChange={hanldeFile}
                    multiple
                  />

                  {showimage()}
                  <textarea
                    type="text"
                    name="detail"
                    rows={11}
                    placeholder={product.detail}
                    onChange={handleInput}
                  />
                  <button type="submit" className="btn btn-default">
                    Đăng ký
                  </button>
                  <div className="showerror">{showError()}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Editproduct;
