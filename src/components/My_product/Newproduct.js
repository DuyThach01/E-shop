import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import apiRequest from "../../api/apiRequest";
function New_product() {
  const y = JSON.parse(localStorage.getItem("user"));
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
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  useEffect(() => {
    apiRequest
      .get("/category-brand")
      .then((re) => {
        setCategory(re.data.category);
        setBrand(re.data.brand);
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
    if (input.status === "1") {
      return <input type="text" name="sale" onChange={handleInput} />;
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

  function handleSubmit(e) {
    e.preventDefault();
    let error = {};
    let flag = true;
    if (input.name === "") {
      error.name = "vui long nhap ten san pham";
      flag = false;
    }
    if (input.price === "") {
      error.price = "vui long nhap gia san pham";
      flag = false;
    }
    if (input.id_category === "") {
      error.id_category = "vui long chon category";
      flag = false;
    }
    if (input.id_brand === "") {
      error.id_brand = "vui long chon brand";
      flag = false;
    }
    if (input.company === "") {
      error.company = "vui long chon cong ty";
      flag = false;
    }
    if (input.status === "") {
      error.status = "vui long chon trang thai";
      flag = false;
    }
    if (input.status === 1) {
      if (input.sale === "") {
        error.sales = "vui long nhap gia ";
        flag = false;
      }
    }
    if (input.detail === "") {
      error.detail = "vui nhap thong tin chi tiet sp";
      flag = false;
    }

    if (file === "") {
      error.avatar = "vui long nhap hinh anh san pham";
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
      let url = "/user/add-product";
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
      apiRequest.post(url, formData, config).then((re) => {
        console.log(re);
        if (re.data.errors) {
          setError(re.data.errors);
        } else {
          alert("Them san pham thanh cong");
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
                <h2>Create Product !</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleInput}
                  />
                  <input
                    type="text"
                    name="price"
                    placeholder="Price"
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
                    placeholder="Company profile"
                    onChange={handleInput}
                  />
                  <input
                    type="file"
                    name="file"
                    onChange={hanldeFile}
                    multiple
                  />
                  <textarea
                    type="text"
                    name="detail"
                    rows={11}
                    placeholder="Detail"
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
export default New_product;
