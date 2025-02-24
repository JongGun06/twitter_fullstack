import React from 'react';
import CenterContentPosts from '../CenterMain/components_center_menu/CenterContentPosts';
import { postApi } from '../../redux/services/PostAction';
import { useUser } from '../../firebase/UserContext';
import { userApi } from '../../redux/services/UserAction';

const CenterBookmark = () => {
  const { data: posts } = postApi.useGetPostsQuery();
  const { user } = useUser();
  const { data: userData } = userApi.useGetUserQuery(user?.uid || "");

  // Получаем список ID постов, которые в закладках
  const bookmarkedPostsIds = userData?.bookmarks?.map(bookmark => bookmark.post) || [];

  // Фильтруем только посты, которые есть в закладках
  //@ts-ignore
  const bookmarkedPosts = posts?.filter(post => bookmarkedPostsIds.includes(post._id)) || [];

  return (
    <div>
      {bookmarkedPosts.slice().reverse().map((post) => (
        <CenterContentPosts post={post} userData={userData} user={user} />
      ))}
    </div>
  );
}

export default CenterBookmark;
