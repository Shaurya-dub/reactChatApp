import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
const Chats = () => {
  const { user } = useAuth();
  console.log(user);
  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      console.log("no user");

      history.push("/");
      return;
    }
    console.log("axios get");
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "Project-ID": "8639c2c3-55ea-4f75-88b2-a96743943550",
          'User-Name' : user.email,
          'User-Secret' : user.uid
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        console.log("sending user data", user);
        const formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "PRIVATE-KEY": "207cceb7-9761-48d5-9311-87eb270ceed1",
              },
            })
            .then(() => {
              setLoading(false);
              console.log("post user", formdata);
            })
            .catch((e) => console.error('creation error',e));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="8639c2c3-55ea-4f75-88b2-a96743943550"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
