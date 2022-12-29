import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import Comments from "./Comment";
function Listcomment(props) {
  const cmt = props.data;
  console.log(cmt);

  function inforrelay(e) {
    let key = e.target.id;
    props.getinfor(key);
  }

  function deleterelay() {
    props.getinfor("");
  }

  function listcmt() {
    console.log(cmt);
    if (cmt.length > 0) {
      return cmt.map((value, index) => {
        if (value.id_comment == 0) {
          const Day = value.created_at;
          let arr = Day.split(" ");
          let link1 = "http://localhost/laravel/public/upload/user/avatar/";
          let link2 = value.image_user;
          let link = link1.concat(link2);
          return (
            <ul className="media-list">
              <li className="media">
                <a className="pull-left">
                  <img className="media-object" src={link} />
                </a>
                <div className="media-body" key={index}>
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user" />
                      {value.name_user}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" />
                      {arr[1]}
                    </li>
                    <li>
                      <i className="fa fa-calendar" /> {arr[0]}
                    </li>
                  </ul>
                  <p>{value.comment}</p>
                  <a
                    id={value.id}
                    onClick={inforrelay}
                    className="btn btn-primary"
                  >
                    <i className="fa fa-reply" />
                    Replay
                  </a>
                  <a onClick={deleterelay} className="btn btn-primary">
                    <i className="fa fa-reply" />
                    Delete Replay
                  </a>
                </div>
              </li>
              {/* <li class="media second-media">
                <a class="pull-left" href="#">
                  <img className="media-object" src={link} />
                </a>
                <div class="media-body">
                  <ul class="sinlge-post-meta">
                    <li>
                      <i class="fa fa-user"></i>Janis Gallagher
                    </li>
                    <li>
                      <i class="fa fa-clock-o"></i> 1:33 pm
                    </li>
                    <li>
                      <i class="fa fa-calendar"></i> DEC 5, 2013
                    </li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <a class="btn btn-primary" href="">
                    <i class="fa fa-reply"></i>Replay
                  </a>
                </div>
              </li> */}

              {cmt.map((value2, x) => {
                if (value.id == value2.id_comment) {
                  let link4 = value2.image_user;
                  let link5 = link1.concat(link4);
                  return (
                    <>
                      <li key={x} class="media second-media">
                        <a class="pull-left" href="#">
                          <img className="media-object" src={link5} />
                        </a>
                        <div class="media-body">
                          <ul class="sinlge-post-meta">
                            <li>
                              <i class="fa fa-user"></i>
                              {value2.name_user}
                            </li>
                            <li>
                              <i class="fa fa-clock-o"></i> 1:33 pm
                            </li>
                            <li>
                              <i class="fa fa-calendar"></i> DEC 5, 2013
                            </li>
                          </ul>
                          <p>{value2.comment}</p>
                          <a class="btn btn-primary" href=""></a>
                        </div>
                      </li>
                    </>
                  );
                }
              })}
            </ul>
          );
        }
      });
    }
  }

  return (
    <div>
      <div className="socials-share">
        <a>
          <img src="images/blog/socials.png" alt="" />
        </a>
      </div>

      <div className="response-area">
        <h2>RESPONSES</h2>
        {listcmt()}
      </div>
    </div>
  );
}
export default Listcomment;
