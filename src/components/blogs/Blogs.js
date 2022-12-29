import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
function Blog() {
  const [data, setData] = useState("");
  useEffect(() => {
    apiRequest
      .get("/blog")
      .then((re) => {
        setData(re.data.blog.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(data);
  function fetchData() {
    if (data.length > 0) {
      return data.map((value, index) => {
        const Day = value.created_at;
        const arr = Day.split(" ");
        let link1 = "http://localhost/laravel/public/upload/Blog/image/";
        let link2 = value.image;
        let link = link1.concat(link2);

        return (
          <div key={index}>
            <h3>{value.title}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user" />
                  {value.id}
                </li>
                <li>
                  <i className="fa fa-clock-o" />
                  {arr[1]}
                </li>
                <li>
                  <i className="fa fa-calendar" />
                  {arr[0]}
                </li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <Link to>
              <img src={link} alt="" />
            </Link>
            <p>{value.content}</p>
            <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>
              Read More
            </Link>
          </div>
        );
      });
    }
  }
  return (
    <div>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">LATEST FROM OUR BLOG</h2>
          <div className="single-blog-post">{fetchData()}</div>
        </div>
      </div>
    </div>
  );
}
export default Blog;
