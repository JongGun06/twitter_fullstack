import React from 'react';
import './centerContent.css';
import { userApi } from '../../redux/services/UserAction';
import { useUser } from '../../firebase/UserContext';
import CenterProfileInfo from './components_center_menu/CenterProfileInfo';
import CenterContentPosts from './components_center_menu/CenterContentPosts';
import { postApi } from '../../redux/services/PostAction';
import { IPost } from '../../redux/model/IPost';

const CenterProfile: React.FC = () => {
  const { user } = useUser();  


  
  
  if (!user) {
    return <div>Загрузка...</div>;
  }
  
  const { data: userr, isLoading, isError, error } = userApi.useGetUserQuery(user.uid);
  const {data: post} = postApi.useGetPostsQuery()


  if (isLoading) {
    return <div>Загрузка...</div>; 
  }

  if (isError) {
    //@ts-ignore
    return <div>Ошибка: {error?.message || 'Не удалось загрузить данные'}</div>; 
  }
  console.log(userr);
  
    return (
        <div className="profile-container">
          <CenterProfileInfo userr={userr}/>
          {post && post.map((post:IPost) => (
            <div>
              {post.author === userr?.googleId ? 
              <CenterContentPosts userData={userr} user={user} post={post}/>
            :null}
            </div>
          ))}
          
        </div>
      );
}

export default CenterProfile;
