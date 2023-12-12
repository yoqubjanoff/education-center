// Home komponenti
import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import EduComponent from "../EduComponent";
import Admin from "../Admin";
import { Context } from "../../context/context";

const Home = () => {
  const context = React.useContext(Context)
  const [url, setUrl] = useState("");
  const { eduData, seteduData, setEditData } = useContext(Context);
  useEffect(() => setUrl(window.location.pathname), [window.location.pathname]);


  return  (
    <div className="home">
      <div className="container">
        {" "}
        {url === "/" && (
          <div>
            <div>
              <p className="oquvmarkazlar">O’quv markazlar</p>
              <div className="line"></div>
            </div>
            <div className="educomponents-box">
            <EduComponent />
            </div>
          </div>
        )}
        {url == "/admin" && <Admin />}
      </div>
    </div>
  );
};

export default Home;
