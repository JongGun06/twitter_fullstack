import React, { useState, useEffect } from "react";
import home_icon from "../../img/home_icon.png";
import search_icon from "../../img/search_icon.png";
import notice_icon from "../../img/notice_icon.png";
import message_icon from "../../img/message_icon.png";
import profile_icon from "../../img/profile_icon.png";
import bookmark_icon from "../../img/bookmark_icon.png";
import x_logo from "../../img/x_logo.png";
import { useUser } from "../../firebase/UserContext";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../redux/model/IUser";
import { userApi } from "../../redux/services/UserAction";




const LeftSidebar: React.FC = () => {

  const [lastChatState, setLastChatState] = useState("");

  useEffect(() => {
    let lastChat = localStorage.getItem("lastChat");
    if (lastChat) {
      setLastChatState(lastChat); // Устанавливаем сохранённый чат в state
    }
  }, []);
  const menuItems = [
    { src: x_logo, link: "/", size: "2.3rem" },
    { name: "Главная", link: "/", src: home_icon },
    { name: "Обзор", link: "/search", src: search_icon },
    { name: "Уведомления", link: "/", src: notice_icon },
    { name: "Сообщения", link: `/message/${lastChatState}`, src: message_icon },
    { name: "Профиль", link: "/profile", src: profile_icon },
    { name: "Заметки", link: "/", src: bookmark_icon },
  ];



  const [buttonText, setButtonText] = useState<string>("Опубликовать пост");
  let { user, setUser } = useUser();
  let navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setButtonText(window.innerWidth < 800 ? "Пост+" : "Опубликовать пост");
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: checkExistenceData, error: checkExistenceError } =
    userApi.useCheckUserExistenceQuery(user?.email ?? "");

  const [createUser] = userApi.useCreateUserMutation();
  const [isUserExist, setIsUserExist] = useState<boolean>(false);

  useEffect(() => {
    if (checkExistenceData) {
      setIsUserExist(checkExistenceData.exists); // Пример получения данных о существовании пользователя
    }
  }, [checkExistenceData]);

  const createUserFunction = async (userData: IUser) => {
    if (!isUserExist) {
      createUser(userData); 
    } else {
      console.log("Пользователь с таким email уже существует");
    }
  };

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

        createUserFunction({
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.photo,
          googleId: newUser.uid,
          registrationDate: `${new Date()
            .toLocaleString("ru-RU", { year: "numeric", month: "long" })
            .replace(".", "")}`, // ✅ Гарантируем, что дата в правильном формате
          subscriptions: [],
          subscribers: [],
          likesPosts: [],
          bookmarks: [],
          reposts: [],
          posts: [],
        });
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

  function signout() {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  }

  if (!user || !user.photo || !user.email) {
    return <div>Loading...</div>;
  }

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "sticky",
        top: "0",
        height: "90vh",
      }}
      
    >
      <div>
        <nav>
          {menuItems.map((item) => (
            <a href={item.link}>
              <img style={{ width: item.size }} src={item.src} alt="" />
              {window.innerWidth > 800 ? <span>{item.name}</span> : null}
            </a>
          ))}
        </nav>
        <button>{buttonText}</button>
      </div>
      <div>
        <a href="/auth" onClick={signout}>
          <img
            style={{ width: "2.75rem", borderRadius: "50%" }}
            src={user.photo}
            alt=""
          />
          {window.innerWidth > 800 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span>{user.name}</span>
              <span style={{ color: "gray" }}>@{user.name}</span>
            </div>
          ) : null}
        </a>
      </div>
    </aside>
  );
};

export default LeftSidebar;
