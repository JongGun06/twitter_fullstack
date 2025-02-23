import React, { FC, useEffect } from 'react';
import { messageApi } from '../../redux/services/MessageAction';
import { userApi } from '../../redux/services/UserAction';
import savedmess from '../../img/savedmess.png'
import { useAppDispatch } from '../../redux/hooks/redux';
import { messinfo } from '../../redux/reducer/MessageInfoReducer';

interface UsersMessageType {
    messid: string
    user: string
}

const UsersMessage:FC<UsersMessageType> = ({messid,user}) => {
    let dispatch = useAppDispatch()
    
    let {data: mess} = messageApi.useGetMessageQuery(messid)

    //@ts-ignore
    let {data: userr} = userApi.useGetUserQuery(user !== mess?.receiver ? mess?.receiver : mess.sender)

    function ClickFun() {
        dispatch(messinfo(messid)) 
    }
    
    
    return (
        <div>
            <div onClick={() => ClickFun()} style={{display:'flex',alignItems:"center",gap:"10px", padding:"10px",borderTop:"0.2px solid #333",borderBottom:"0.2px solid #333",cursor:"pointer"}}>
                <img style={{width:"2.5rem", borderRadius:"50%"}} src={user === userr?.googleId ? savedmess :userr?.avatar} alt="" />
                <p>{user === userr?.googleId ? "Избранное" : userr?.name}</p>
            </div>
        </div>
    );
}

export default UsersMessage;
