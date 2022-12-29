import React, { useState } from "react";
import apiRequest from "../../api/apiRequest";
function Comments(props) {
  const [Content, setContent] = useState("");

  let replay = props.replay;

  const x = JSON.parse(localStorage.getItem("idblog"));
  const y = JSON.parse(localStorage.getItem("user"));
  const id_blog = x.id;

  function handleContent(e) {
    setContent(e.target.value);
  }
  function deleteValue() {
    var name = document.getElementById("btn");
    var textarea = document.getElementById("name"); //intead of "input"
    var data = textarea.value;
    for (var i = 0; i < data.length; i++) {
      if (data.substr(i, data) == name.value) {
        textarea.value = "";
      }
    }
  }

  function post() {
    if (!y) {
      alert("Vui lòng đăng nhập tài khoản");
    }
    if (Content == "") {
      alert("Vui lòng nhập bình luận");
    } else {
      let url = "/blog/comment/" + id_blog;
      let accessToken = y.success.token;
      const id_user = y.Auth.id;
      deleteValue();
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      let xx = replay ? replay : 0;

      const formData = new FormData();
      formData.append("id_blog", id_blog);
      formData.append("id_user", id_user);
      formData.append("id_comment", xx);
      formData.append("comment", Content);
      formData.append("image_user", y.Auth.avatar);
      formData.append("name_user", y.Auth.name);
      setContent("");
      apiRequest.post(url, formData, config).then((re) => {
        props.getCmt(re.data);
        console.log(re);
      });
    }
  }

  return (
    <div>
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                id="name"
                name="message"
                rows={11}
                onChange={handleContent}
              ></textarea>
              <button id="btn" onClick={post} className="btn btn-primary">
                post comment
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*/Repaly Box*/}
    </div>
  );
}
export default Comments;
