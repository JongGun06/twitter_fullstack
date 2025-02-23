import React from 'react';
import { chatApi } from '../../redux/services/ChatAction';

const ChatMessageComponents = ({messageInfo, messages, user}) => {
    const { data: chat, error} = chatApi.useGetMessageQuery(messageInfo);
    if(error) {
        return <div> </div>
    }else {
    return (
        <div>
            {chat && chat.map((chatItem) => (
                <div
                 style={
                    {display:"flex", justifyContent: chatItem.author === user ? "flex-end":"flex-start"}
                }
                 key={chatItem._id}>
                    <div style={{display:"flex", flexDirection:"column",alignItems: chatItem.author === user ? "end":"start"}}>
                        <img style={{width:"13rem", borderRadius:"5px",marginTop:"2rem"}} src={chatItem.img} alt="" />
                        {chatItem.text === '1' ? null : <p style={{background: chatItem.author === user ? "blue":"rgb(47, 51, 54)", padding:"14px", borderRadius:"10px"}}>{chatItem.text}</p>}
                    </div>
                </div>
            ))}
            <br /><br /><br /><br /><br />
        </div>
    );}}
export default ChatMessageComponents;
