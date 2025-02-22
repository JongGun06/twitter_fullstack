import React, { useEffect, useState } from "react";
import LeftSidebar from "../LeftMain/LeftSidebar";
import RightSidebar from "../RightMain/RightSidebar";
import RightMessage from "./RightMessage";
import search_logo from "../../img/search_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../firebase/UserContext"; // ваш контекст
import { userApi } from "../../redux/services/UserAction";
import { auth } from "../../firebase/firebase";
import UsersMessage from "./UsersMessage";

const Message = () => {
  const { googleId } = useParams();
  const navigate = useNavigate();
  
  const { user, setUser } = useUser();

  let [messId, setMessId] = useState<string[]>([])
  
  const [isLoading, setIsLoading] = useState(true); 
  
  const { data: userr, isLoading: userLoading } = userApi.useGetUserQuery(user?.uid || "");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const newUser = {
          name: authUser.displayName || "",
          email: authUser.email || "",
          photo: authUser.photoURL || "",
          uid: authUser.uid || "",
        };
        setUser(newUser);
      } else {
        navigate("/auth");
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigate, setUser]);

  useEffect(() => {
    if (!user || !user.uid) return;  

    if (userr) {
      setIsLoading(false); 
    }
    const ids = (userr && userr.messages) ? userr.messages.map(mess => mess.messagesID) : [];
    setMessId(ids);
  }, [userr, user]); 
  console.log(messId);
  

  if (isLoading || userLoading || !user || !userr) {
    return <div>Загрузка...</div>;
  }

  

  return (
    <div style={{ display: "flex" }}>
      <div className="left-sidebar">
        <LeftSidebar />
      </div>

      <div style={{ width: "35rem" }}>
        <div
          style={{
            display: "block",
            width: "100%",
            maxWidth: "32rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2>Сообщения</h2>
          <div className="search_block">
            <div className="search">
              <img
                style={{ position: "absolute", top: "33%", left: "7px" }}
                src={search_logo}
                alt=""
              />
              <input type="text" name="" id="" placeholder="поиск" />
            </div>
          </div>
          <div className="users_message">
            {messId.map(messId => (
              <UsersMessage messid={messId} user={user.uid}/>
            ))}
          </div>
        </div>
      </div>

      <div className="dn_rightblock" style={{ borderLeft: "0.5px solid #333" }}>
        <RightMessage />
      </div>
    </div>
  );
};

export default Message;
