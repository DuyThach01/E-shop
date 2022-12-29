import StarRatings from "react-star-ratings";
import { useState } from "react";
import apiRequest from "../../api/apiRequest";
import { useEffect } from "react";
function Rate() {
  const [average, setAverage] = useState("");
  let rating = 0;

  const x = JSON.parse(localStorage.getItem("idblog"));
  const y = JSON.parse(localStorage.getItem("user"));
  const id_blog = x.id;
  useEffect(() => {
    apiRequest
      .get("/blog/rate/" + id_blog)
      .then((re) => {
        setAverage(re.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(average);

  function averageRate() {
    if (Object.keys(average).length > 0) {
      let a = 0;
      let b = Object.keys(average).length;
      Object.keys(average).map((value, index) => {
        a = average[value].rate + a;
      });
      rating = a / b;
      console.log(rating);
    } else {
      console.log(1);
    }
  }

  function changeRating(newRating, name) {
    rating = newRating;
    console.log(newRating);
    if (!y) {
      alert("Vui lòng đăng nhập tài khoản");
    } else {
      let url = "/blog/rate/" + id_blog;
      let accessToken = y.success.token;

      const id_user = y.Auth.id;

      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      const formData = new FormData();
      formData.append("blog_id", id_blog);
      formData.append("user_id", id_user);
      formData.append("rate", rating);

      apiRequest.post(url, formData, config).then((re) => {
        console.log(re);
      });
    }
  }

  return (
    <div>
      {averageRate()}
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li className=" rate">
            <StarRatings
              rating={rating}
              starRatedColor="green"
              changeRating={changeRating}
              numberOfStars={6}
              name="rating"
            />
          </li>
          <li className="color">(6 votes)</li>
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li>
            <a className="color">
              Pink <span>/</span>
            </a>
          </li>
          <li>
            <a className="color">
              T-Shirt <span>/</span>
            </a>
          </li>
          <li>
            <a className="color">Girls</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Rate;
