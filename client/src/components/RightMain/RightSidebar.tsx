import React from "react";
import { userApi } from "../../redux/services/UserAction";
import { useNavigate } from "react-router-dom";



const RightSidebar: React.FC = () => {

  let navigate = useNavigate()
  function profileUser(id: string):void {
    navigate(`/profile/${id}`)
  }

  let {data: users} = userApi.useGetUsersQuery()
  return (
    <aside className="right-sidebar" style={{position:"sticky", top:0}}>
      <div>
        <h2>Кого читать</h2>
        {users && users.map((user) => (
          <div key={user._id} className="user"  style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
             <div style={{display:"flex", gap:"8px"}} onClick={() => user.googleId && profileUser(user.googleId)}>
          <img
            style={{ width: "2.75rem", borderRadius: "50%", cursor:"pointer" }}
            src={user.avatar}
            alt=""
          />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                cursor:"pointer"
              }}
            >
              <span>{user.name}</span>
              <span style={{ color: "gray" }}>@{user.name}</span>
            </div>
        </div>
        <div className="clickread">
              <button>Читать</button>
        </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
