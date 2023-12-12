import React, { useEffect, useState } from "react";
import "./Login.css";
import { serverDomain } from "../../utils/url";
import openEye from "../../assets/icons/showeye.svg";
import closeEye from "../../assets/icons/closeeye.png";
import { useNavigate } from "react-router-dom";
import { IS_USER_LOGIN } from "../../utils/constants";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  function encodeBase64(str) {
    return btoa(str);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const name = evt.target.elements.name.value;
    const password = evt.target.elements.password.value;

    if (name === "root123" && password === "root123") {
      localStorage.setItem("token", encodeBase64(name + ":" + password));
      localStorage.setItem(IS_USER_LOGIN, true);
      navigate('/')
      makeAPICall();
    } else {
      setLoginError(true);
    }
  };

  const makeAPICall = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${serverDomain}/get/all`, {
        headers: {
          Authorization: "Basic " + token,
        },
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/admin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <p className="login-title">KIRISH</p>
        <form className="forms" onSubmit={(evt) => handleSubmit(evt)}>
          <input
            type="text"
            className="name-input"
            placeholder="Your name"
            name="name"
            style={{ border: loginError ? "1px solid red" : "" }}
          />
          <div className="input-password" style={{ border: loginError ? "1px solid red" : "" }}>
            <input
              type={showPassword ? "text" : "password"}
              className='password-input'
              placeholder="Your password"
              name="password"
            />
            <img
              src={showPassword ? openEye : closeEye}
              alt=""
              className="close-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              
            />
          </div>
          {loginError && (
            <p className="error-message">Noto'g'ri login yoki parol</p>
          )}
          <button className="kirish-btn" type="submit">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
