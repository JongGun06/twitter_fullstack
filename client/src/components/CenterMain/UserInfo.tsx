// UserInfo.tsx
import React, { useEffect, useState } from "react";
import { userApi } from "../../redux/services/UserAction";
import { IUser } from "../../redux/model/IUser";
import { IPost } from "../../redux/model/IPost";
import { useNavigate } from "react-router-dom";

interface UserInfoProps {
  post: IPost;
}

const UserInfo: React.FC<UserInfoProps> = ({ post }) => {
  const { data: user } = userApi.useGetUserQuery(post.author);
  


  let navigate = useNavigate()
    function profileUser(id: string):void {
      navigate(`/profile/${id}`)
    }

  return (
    <div style={{display:"flex",gap:"0.5rem"}} className="user-info">
      {user && (
        <>
          <img onClick={() => user.googleId && profileUser(user.googleId)} style={{borderRadius:"50%", height:"3rem",cursor:"pointer"}} src={user.avatar} alt="User avatar" />
          <div style={{display:"flex",gap:"0.7rem",alignItems:"center"}}>
          <h3 style={{cursor:"pointer"}} onClick={() => user.googleId && profileUser(user.googleId)}>{user.name}</h3>
          <span>{post.createDate}</span> </div> 
          
        </>
      )}
    </div>
  );
};

export default UserInfo;
