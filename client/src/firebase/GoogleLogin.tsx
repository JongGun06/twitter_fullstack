import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { useUser } from "./UserContext";
import { userApi } from "../redux/services/UserAction";
import { IUser } from "../redux/model/IUser";
import './style.css'
import x_logo from "../img/x_logo.png"; // Логотип X (можно заменить на иконку)
import googleicon from "../img/google.png"; // Логотип X (можно заменить на иконку)



const GoogleLogin = () => {
  

  let { user, setUser } = useUser();
  let navigate = useNavigate();
  let provider = new GoogleAuthProvider();
  let signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      let user = result.user;
      let userName = user.displayName;
      let userPhoto = user.photoURL;
      let email = user.email;
      setUser({
        name: userName,
        photo: userPhoto,
        email: email,
        uid: user.uid,
      });
      navigate("/");
    });
  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={x_logo} alt="X logo" className="logo" />
        <h2 className="login-heading">Добро пожаловать в X</h2>
        <button className="login-button" onClick={signInWithGoogle}>
          <img
            src={googleicon}
            alt="Google logo"
            className="google-logo"
          />
          Войти с Google
        </button>
      </div>
    </div>
  );

};

export default GoogleLogin;
