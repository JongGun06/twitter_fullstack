import React, { useEffect, useState } from "react";
import LeftSidebar from "../LeftMain/LeftSidebar";
import RightMessage from "./RightMessage";
import UsersMessage from "./UsersMessage";
import search_logo from "../../img/search_icon.png";
import messageplus from "../../img/messageplus.png";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../firebase/UserContext"; 
import { userApi } from "../../redux/services/UserAction";
import { auth } from "../../firebase/firebase";
import { useAppSelector } from "../../redux/hooks/redux";
import '../../App.css'
const Message = () => {
  const navigate = useNavigate();
  const messageInfo = useAppSelector((state) => state.messageSlice.messageInfo);
  const { user, setUser } = useUser();
  
  const [messId, setMessId] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth >= 980);
  const [showMessages, setShowMessages] = useState(messageInfo === "1");

  const { data: userr, isLoading: userLoading } = userApi.useGetUserQuery(user?.uid || "");

  // Следим за шириной экрана
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth >= 980;
      setIsMobile(mobile);

      // Если выходим из мобильного режима, переключаем на `RightMessage`
      if (!mobile) {
        setShowMessages(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Следим за изменением `messageInfo`
  useEffect(() => {
    setShowMessages(messageInfo === "1");
  }, [messageInfo]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          name: authUser.displayName || "",
          email: authUser.email || "",
          photo: authUser.photoURL || "",
          uid: authUser.uid || "",
        });
      } else {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [navigate, setUser]);

  useEffect(() => {
    if (!user || !user.uid) return;

    if (userr) {
      setIsLoading(false);
    }
    const ids = userr?.messages?.map((mess) => mess.messagesID) || [];
    setMessId(ids);
  }, [userr, user]);

  if (isLoading || userLoading || !user || !userr) {
    return <div>Загрузка...</div>;
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="left-sidebar">
        <LeftSidebar />
      </div>

      {showMessages || isMobile ? (
        <div style={{ width: "30rem" }}>
          <div
            style={{
              display: "block",
              width: "100%",
              maxWidth: "32rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="first_block">
            <h2>Сообщения</h2>
            <a href="/search">
              <img style={{width:"1.3rem",marginTop:"5px"}} src={messageplus} alt="" />
            </a>
            </div>
            <div className="search_block">
              <div className="search">
                <img
                  style={{ position: "absolute", top: "33%", left: "7px" }}
                  src={search_logo}
                  alt=""
                />
                <input type="text" placeholder="поиск" />
              </div>
            </div>
            <div className="users_message">
              {messId.slice().reverse().map((messId) => (
                <UsersMessage key={messId} messid={messId} user={user.uid} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="" style={{ borderLeft: "0.5px solid #333", borderRight: "0.5px solid #333" }}>
          <RightMessage />
        </div>
      )}
      <div className="dn_rightblock" style={{ borderLeft: "0.5px solid #333", borderRight: "0.5px solid #333" }}>
          <RightMessage />
        </div>
    </div>
  );
};

export default Message;
