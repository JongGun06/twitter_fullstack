import React from 'react';
import CenterContentPosts from '../CenterMain/components_center_menu/CenterContentPosts';
import { postApi } from '../../redux/services/PostAction';
import { useUser } from '../../firebase/UserContext';
import { userApi } from '../../redux/services/UserAction';

const CenterBookmark = () => {
      const { data: posts } = postApi.useGetPostsQuery();
      let {user} = useUser()
      const { data: userData } = userApi.useGetUserQuery(user?.uid || "");
      console.log(userData);
      
      

    
    return (
        <div>
            {posts && posts.slice().reverse().map((post) => (
                <CenterContentPosts post={post} userData={userData} user={user}/>
            ))}
        </div>
    );
}

export default CenterBookmark;
