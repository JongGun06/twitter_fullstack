import React from "react";
import search_logo from "../../img/search_icon.png";
import home_icon from "../../img/home_icon.png";
import { userApi } from "../../redux/services/UserAction";
import { IUser } from "../../redux/model/IUser";
import { useNavigate } from "react-router-dom";


const CenterSearch: React.FC = () => {
  let {data: users} = userApi.useGetUsersQuery()

  let navigate = useNavigate()
  function profileUser(id: string):void {
    navigate(`/profile/${id}`)
  }


  return (
    <div className="center-content">
      <div className="search_block">
        <div className="search">
          <img style={{position:"absolute", top:"33%",left:"7px"}} src={search_logo} alt="" />
          <input type="text" name="" id="" placeholder="поиск" />
        </div>
      </div>
      <br />
      <div className="search_block2">
      <button className="tab">Посты</button>
      <button className="tab active">Посты</button>
      </div>
         {users && users.map((user: IUser) => (
          <div style={{cursor:"pointer"}} className="search_block3">
          <a onClick={() => user.googleId && profileUser(user.googleId)}>
            <img
              style={{ width: "1.75rem", borderRadius: "50%" }}
              src={user.avatar}
              alt=""
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span>{user.name}</span>
              <span style={{ color: "gray" }}>{user.email}</span>
            </div>
          </a>
        </div>
         ))}
    </div>
  );
};

export default CenterSearch;
