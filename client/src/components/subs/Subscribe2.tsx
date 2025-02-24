import React from "react";
import { useParams } from "react-router-dom";
import LeftSidebar from "../LeftMain/LeftSidebar";
import RightSidebar from "../RightMain/RightSidebar";
import { userApi } from "../../redux/services/UserAction";

const Subscribe2 = () => {
  let { id } = useParams();
  let {data:userr} = userApi.useGetUserQuery(id  ?? '')
  return (
    <div style={{ display: "flex" }}>
      <div className="left-sidebar">
        <LeftSidebar />
      </div>
      <div style={{width:"30rem"}}>
           {userr?.subscribers?.map((sub) => (
            <div 
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                marginTop: "15px",
                marginBottom: "15px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img style={{ width: "3.2rem", borderRadius: "50%" }} src={sub.avatar} alt="" />
                <p>{sub.name}</p>
            </div>
            </div>
           ))}
      </div>
      <div className="dn_rightblock">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Subscribe2;
