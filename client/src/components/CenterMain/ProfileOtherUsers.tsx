import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../../redux/services/UserAction';
import { postApi } from '../../redux/services/PostAction';
import { v4 as uuidv4 } from "uuid";
import { IPost } from '../../redux/model/IPost';
// import CenterProfileOtherUsers from './components_center_menu/CenterProfileOtherUsers';
import CenterContentPosts from './components_center_menu/CenterContentPosts';
import { useUser } from '../../firebase/UserContext';
import messageicon from '../../img/message_icon.png'
import { messageApi } from '../../redux/services/MessageAction';
import { IUser } from '../../redux/model/IUser';



const ProfileOtherUsers = () => {
    let {email} = useParams<{email: string}>()
    let {data: userr, isLoading} = userApi.useGetUserQuery(email as unknown as string)
    let {data: post} = postApi.useGetPostsQuery()
    let {user} = useUser()
    const uniqueId = uuidv4();
    let navigate = useNavigate()
    let [createMessage] = messageApi.useCreateMessageMutation()
    let {data: message} = messageApi.useGetMessagesQuery()
    const date = new Date(); // Текущая дата
    const formattedDate = date.toLocaleString("ru-RU", { month: "long", year: "numeric" });
    let {data: userr1} = userApi.useGetUserQuery(user.uid)
    let {data: userr2} = userApi.useGetUserQuery(userr?.googleId as unknown as string)
    let [updateUser] = userApi.useUpdateUserMutation()

    function messageNav() {
        if(userr?.googleId && user.uid && message){
          let lastStorage = localStorage.getItem("lastChat");
          const chatExists = message?.some(
            (m) =>
              (m.sender === user.uid && m.receiver === userr?.googleId) ||
              (m.sender === userr?.googleId && m.receiver === user.uid)
          );
          
          if (!chatExists) {
            createMessage({
              id: uniqueId,
              sender: user.uid,
              receiver: userr?.googleId,
              messages: [],
              createDate: formattedDate,
            });
            console.log("createMessage: ",{
              id: uniqueId,
              sender: user.uid,
              receiver: userr?.googleId,
              messages: [],
              createDate: formattedDate,
            });
            
            updateUser({
              ...userr1,
              messages: [...(userr1?.messages ?? []), { author: user.uid, messagesID: uniqueId }]
            });

            updateUser({
              ...userr2,
              messages: [...(userr2?.messages ?? []), { author: userr.googleId, messagesID: uniqueId }]
            });
          } else {
            navigate(`/message/${lastStorage}`)
          }
          console.log(uniqueId)
        }
      navigate(`/message/${userr?.googleId}`)
    }
    if (isLoading && !user.uid || !user) {
      return <div className='center-content'>Загрузка...</div>; 
    }
  console.log("user",user);
  
    
    return (
        <div className='center-content'>
            <div className="profile-container">
          <div className="profile-card">
            <div className="profile-banner" />
            <div className="profile-avatar-wrapper">
              <img
                className="profile-avatar"
                src={userr?.avatar}
                alt="Avatar"
              />
              <div style={{display:"flex", gap:"5px",alignItems:"center"}}>
                <div style={{borderRadius:"39%",background:"black"}}>
                    <img onClick={messageNav} style={{width:"1.3rem",borderRadius:"39%",border:"1px solid gray",padding:"5px",cursor:"pointer"}} src={messageicon} alt="" />
                </div>
                {user.uid === userr?.googleId ? null : <button>Читать</button>}
              </div>
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{userr?.name}</h2>
              <p className="profile-username">{userr?.email}</p>
              <div className="profile-meta">
                <span>📅 Регистрация: {userr?.registrationDate}</span>
              </div>
              <div className="profile-followers">
                <span>{userr?.subscriptions?.length} в читаемых</span>
                <span>{userr?.subscribers?.length} читателей</span>
              </div>
            </div>
            <div className="profile-tabs">
              <button className="tab active">Посты</button>
              <button className="tab">Репосты</button>
              <button className="tab">Избранное</button>
            </div>
            <div>
                {post && post.slice().reverse().map((post: IPost) => (
                    <div>
                        {post.author === userr?.googleId ? (
                        <CenterContentPosts post={post} userData={userr} user={user} />
                        ): null}
                    </div>
                ))}
            </div>
          </div>
        </div>
        </div>
    );
}

export default ProfileOtherUsers;
