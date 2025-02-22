import React, { FC, useEffect } from 'react';
import { messageApi } from '../../redux/services/MessageAction';
import { userApi } from '../../redux/services/UserAction';

interface UsersMessageType {
    messid: string
    user: string
}

const UsersMessage:FC<UsersMessageType> = ({messid,user}) => {
    let {data: mess} = messageApi.useGetMessageQuery(messid)

    //@ts-ignore
    let {data: userr} = userApi.useGetUserQuery(user !== mess?.receiver ? mess?.receiver : mess.sender)


    console.log("messid:", messid)
    console.log('Message:', mess);
    console.log('User data:', userr);
    
    return (
        <div>
            {userr?.name}
        </div>
    );
}

export default UsersMessage;
