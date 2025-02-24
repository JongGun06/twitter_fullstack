import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '../../redux/services/UserAction';
import { postApi } from '../../redux/services/PostAction';
import { v4 as uuidv4 } from "uuid";
import { IPost } from '../../redux/model/IPost';
import CenterContentPosts from './components_center_menu/CenterContentPosts';
import { useUser } from '../../firebase/UserContext';
import messageicon from '../../img/message_icon.png';
import { messageApi } from '../../redux/services/MessageAction';

const ProfileOtherUsers = () => {
  let { email } = useParams<{ email: string }>();
  let { data: userr, isLoading: isUserLoading } = userApi.useGetUserQuery(email as unknown as string, { skip: !email });
  let { data: post, isLoading: isPostsLoading } = postApi.useGetPostsQuery();
  let { user } = useUser();
  const uniqueId = uuidv4();
  let navigate = useNavigate();
  let [createMessage] = messageApi.useCreateMessageMutation();
  let { data: message } = messageApi.useGetMessagesQuery();
  const date = new Date();
  const formattedDate = date.toLocaleString("ru-RU", { month: "long", year: "numeric" });
  let { data: currentUser } = userApi.useGetUserQuery(user?.uid || '', { skip: !user });
  let [updateUser] = userApi.useUpdateUserMutation();

  // Проверка, подписан ли текущий пользователь на просматриваемого пользователя
  const isSubscribed = currentUser?.subscriptions?.some(sub => sub.user === userr?.googleId);

  // Функция подписки/отписки
  const handleSubscribe = async () => {
    if (!user || !userr || !currentUser) return;

    if (isSubscribed) {
      // Отписка
        //@ts-ignore
      const updatedSubscriptions = currentUser.subscriptions.filter(sub => sub.user !== userr.googleId);
        //@ts-ignore
      const updatedSubscribers = userr.subscribers.filter(sub => sub.user !== user.uid);

      await updateUser({
        ...currentUser,
        subscriptions: updatedSubscriptions,
      });
      await updateUser({
        ...userr,
        subscribers: updatedSubscribers,
      });
    } else {
      // Подписка
      const newSubscription = { user: userr.googleId, avatar: userr.avatar, name: userr.name };
      const newSubscriber = { user: user.uid, avatar: currentUser.avatar, name: currentUser.name };

      await updateUser({
        ...currentUser,
        //@ts-ignore
        subscriptions: [...(currentUser.subscriptions || []), newSubscription],
      });
      await updateUser({
        ...userr,
        //@ts-ignore
        subscribers: [...(userr.subscribers || []), newSubscriber],
      });
    }
  };

  function messageNav() {
    if (userr?.googleId && user?.uid && message) {
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
        updateUser({
          ...currentUser,
          messages: [...(currentUser?.messages ?? []), { author: user.uid, messagesID: uniqueId }],
        });
        updateUser({
          ...userr,
          messages: [...(userr?.messages ?? []), { author: userr.googleId, messagesID: uniqueId }],
        });
      } else if (lastStorage) {
        navigate(`/message/${lastStorage}`);
        return;
      }
      navigate(`/message/${userr?.googleId}`);
    }
  }

  function subs() {
    navigate(`/sub3/${userr?.googleId}`)
  }
  function subs2() {
    navigate(`/sub2/${userr?.googleId}`)
  }

  if (!user || isUserLoading || isPostsLoading || !userr) {
    return <div className='center-content'>Загрузка...</div>;
  }

  return (
    <div className='center-content'>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-banner" />
          <div className="profile-avatar-wrapper">
            <img className="profile-avatar" src={userr?.avatar} alt="Avatar" />
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <div style={{ borderRadius: "39%", background: "black" }}>
                <img
                  onClick={messageNav}
                  style={{ width: "1.3rem", borderRadius: "39%", border: "1px solid gray", padding: "5px", cursor: "pointer" }}
                  src={messageicon}
                  alt=""
                />
              </div>
              {user.uid === userr?.googleId ? null : (
                <button className='' onClick={handleSubscribe}>
                  {isSubscribed ? "Отписаться" : "Подписаться"}
                </button>
              )}
            </div>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{userr?.name}</h2>
            <p className="profile-username">{userr?.email}</p>
            <div className="profile-meta">
              <span>📅 Регистрация: {userr?.registrationDate}</span>
            </div>
            <div className="profile-followers">
              <span style={{cursor:"pointer"}} onClick={subs}>{userr?.subscriptions?.length} в читаемых</span>
              <span style={{cursor:"pointer"}} onClick={subs2}>{userr?.subscribers?.length} читателей</span>
            </div>
          </div>
          <div className="profile-tabs" style={{ paddingLeft: "2rem", justifyContent: "flex-start" }}>
            <button className="tab active">Посты</button>
          </div>
          <div>
            {post && post.slice().reverse().map((post: IPost) => (
              <div key={post._id}>
                {post.author === userr?.googleId ? (
                  <CenterContentPosts post={post} userData={userr} user={user} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOtherUsers;