import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { useUser } from "./UserContext";
import { userApi } from "../redux/services/UserAction";
import { IUser } from "../redux/model/IUser";

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
    <div>
      <button onClick={signInWithGoogle}>Google</button>
    </div>
  );
};

export default GoogleLogin;
