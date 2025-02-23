import React from 'react';
import { messageSlice, messinfo } from '../../redux/reducer/MessageInfoReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { messageApi } from '../../redux/services/MessageAction';
import CreateMessage from './CreateMessage';
import { useUser } from '../../firebase/UserContext';
import { userApi } from '../../redux/services/UserAction';
import ChatMessageComponents from './ChatMessageComponents';
import arrowicon from '../../img/arrowicon.png'

const RightMessage = () => {
    const messageInfo = useAppSelector(state => state.messageSlice.messageInfo);
    let dispatch = useAppDispatch()
    let {data: messages} = messageApi.useGetMessageQuery(messageInfo)
    //@ts-ignore
    let {user} = useUser()
    //@ts-ignore
    let {data: userr} = userApi.useGetUserQuery(user.uid !== messages?.receiver ? messages?.receiver : messages?.sender)

    if(!user || !user.uid) {
        return <div>loading...</div>
    }
    function arrowFun(){
        window.location.reload()
    }

   

    return (
        <div style={{position:"relative", height:"100%"}}>
            {userr ? 
            <div>
                <div>
                    <img className='dn_arrow' onClick={arrowFun} style={{width:"1.5rem", position:"absolute", top:"10px",left:"15px",cursor:"pointer"}} src={arrowicon} alt="" />
                </div>
            
            <div className='aboutfriend'>
                <img style={{borderRadius:"50%", width:"5rem", marginTop:"3rem"}} src={userr?.avatar} alt="" />
                <p>{userr?.name}</p>
                <p>{userr?.email}</p>
                <p>Регистрация: {userr?.registrationDate}</p>
            </div> 
            <div style={{marginRight:"12px",marginLeft:"12px"}}>
                <ChatMessageComponents messageInfo={messageInfo} user={user.uid} messages={messages}/>
            </div>
            
            <div>
                
                <CreateMessage user={user.uid}/> 
            </div>
            </div>
            : null} 
        </div>
    );
}

export default RightMessage;
