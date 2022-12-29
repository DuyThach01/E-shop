import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import Comments from "./Comment";
import Listcomment from "./Listcomment";
import Rate from "./Rate";
function Detail() {
  const params = useParams();
  localStorage.setItem("idblog", JSON.stringify(params));
  const [data, setdata] = useState("");
  const [list, setList] = useState([]);

  const [b, setb] = useState("");

  useEffect(() => {
    apiRequest
      .get("/blog/detail/" + params.id)
      .then((re) => {
        setdata(re.data.data);
        setList(re.data.data.comment);
      })
      .catch((error) => console.log(error));
  }, []);
  function getCmt(x) {
    let a = x.data;
    const sumCmt = list.concat(a);
    setList(sumCmt);
  }
  function getinfor(x) {
    setb(x);
  }
  function fetchData() {
    if (data) {
      const Day = data.created_at;
      let arr = Day.split(" ");
      let link1 = "http://localhost/laravel/public/upload/Blog/image/";
      let link2 = data.image;
      let link = link1.concat(link2);

      return (
        <div>
          <h3>{data.title}</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user" />
                {data.id}
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
          <p>{data.content}</p>
        </div>
      );
    }
  }
  return (
    <div>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">LATEST FROM OUR BLOG</h2>
          <div className="single-blog-post">
            {fetchData()}
            <Rate />
            <Listcomment data={list} getinfor={getinfor} />
            <Comments getCmt={getCmt} replay={b} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;
