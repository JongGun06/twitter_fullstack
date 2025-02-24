import React from 'react';
import './centerContent.css';
import { userApi } from '../../redux/services/UserAction';
import { useUser } from '../../firebase/UserContext';
import CenterProfileInfo from './components_center_menu/CenterProfileInfo';
import CenterContentPosts from './components_center_menu/CenterContentPosts';
import { postApi } from '../../redux/services/PostAction';
import { IPost } from '../../redux/model/IPost'; // Предполагаю, что интерфейсы в этом файле
import { useAppSelector } from '../../redux/hooks/redux';

const CenterProfile: React.FC = () => {
  const { user } = useUser();  
  const action = useAppSelector(state => state.activeSlice.active);

  const { data: userr, isLoading: isUserLoading, error: userError } = 
    userApi.useGetUserQuery(user?.uid || '', { skip: !user });
  const { data: posts, isLoading: isPostsLoading } = postApi.useGetPostsQuery();
  const { data: userData } = userApi.useGetUserQuery(user?.uid || "", { skip: !user });

  const bookmarkedPostsIds = userData?.bookmarks?.map(bookmark => bookmark.post) || [];
  //@ts-ignore
  const bookmarkedPosts = posts?.filter(post => bookmarkedPostsIds.includes(post._id)) || [];

  const repostedPostsIds = userData?.reposts?.map(repost => repost.post) || [];
  //@ts-ignore
  const repostedPosts = posts?.filter(post => repostedPostsIds.includes(post._id)) || [];

  if (!user || isUserLoading || isPostsLoading) {
    return <div>Загрузка...</div>;
  }

  

  const userPosts = posts?.filter(post => post.author === userr?.googleId) || [];

  return (
    <div className="profile-container">
      <CenterProfileInfo userr={userr} />
      
      {action === "Посты" ? (
        userPosts.map((post: IPost) => (
          <CenterContentPosts 
            key={post._id}
            userData={userr} 
            user={user} 
            post={post}
          />
        ))
      ) : action === "Репосты" ? (
        repostedPosts.slice().reverse().map((post: IPost) => (
          <CenterContentPosts 
            key={post._id}
            post={post} 
            userData={userData} 
            user={user} 
          />
        ))
      ) : action === "Избранное" ? (
        bookmarkedPosts.slice().reverse().map((post: IPost) => (
          <CenterContentPosts 
            key={post._id}
            post={post} 
            userData={userData} 
            user={user} 
          />
        ))
      ) : (
        userPosts.map((post: IPost) => (
          <CenterContentPosts 
            key={post._id}
            userData={userr} 
            user={user} 
            post={post}
          />
        ))
      )}
    </div>
  );
}

export default CenterProfile;