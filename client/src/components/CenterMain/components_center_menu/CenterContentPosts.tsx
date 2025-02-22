import { FC, useState } from 'react';
import { IPost } from '../../../redux/model/IPost';
import { IUser } from '../../../redux/model/IUser';
import UserInfo from '../UserInfo';
import commentpost from '../../../img/commentpost.png'
import repostpost from '../../../img/repostpost.png'
import repostpostactive from '../../../img/repostpostactive.png'
import likepost from '../../../img/likepost.png'
import bookmarkpost from '../../../img/bookmarkpost.png'
import bookmarkactive from '../../../img/bookmarkactive.png'
import likepostactive from '../../../img/likepostactive.png'
import Modal from "../..//Modal";
import { postApi } from '../../../redux/services/PostAction';
import { userApi } from '../../../redux/services/UserAction';

interface CenterContentPostsProps {
    post: IPost,
    userData: IUser | undefined
    user: any
}

const CenterContentPosts:FC<CenterContentPostsProps> = ({post, userData, user}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [comments, setComments] = useState<string[]>([
      "Комментарий 1", 
      "Комментарий 2", 
      "Комментарий 3"
    ]); 
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const [updatePost] = postApi.useUpdatePostMutation();
    const [updateUser] = userApi.useUpdateUserMutation();



    function thelikepost(post: IPost) {
        const likesPosts = userData?.likesPosts || [];
        
        const postAlreadyLiked = likesPosts.some(like => like.post === post._id);
      
        if (!postAlreadyLiked) {
          updatePost({ ...post, likes: post.likes + 1 });
          //@ts-ignore
          updateUser({...userData, likesPosts:[...userData?.likesPosts, {post:post._id, author: post.author}]});
        }else{
          updateUser({
            ...userData,
            likesPosts: likesPosts.map((b) =>
              b.post === post._id ? { ...b, state: !b.state } : b
            ),
          }) }
        
      }
      function therepostpost(post: IPost) {
          const reposts = userData?.reposts ?? [];
        
          const postAlreadyReposted= reposts.some(like => like.post === post._id);
      
        
          if (!postAlreadyReposted) {
             //@ts-ignore
             updateUser({...userData, reposts:[...userData?.reposts, {post:post._id, author: post.author}]});
            updatePost({ ...post, reposts: [...post.reposts, {author: user.uid}] });
            }else{
              updateUser({
                ...userData,
                reposts: reposts.map((b) =>
                  b.post === post._id ? { ...b, state: !b.state } : b
                ),
              }) }
        }
        function thebookmarkpost(post: IPost) {
            let bookmarkpost = userData?.bookmarks ?? []
            const postAlreadyReposted= bookmarkpost.some(like => like.post === post._id);
            if (!postAlreadyReposted) {
              //@ts-ignore
              updateUser({...userData, bookmarks:[...userData?.bookmarks, {post:post._id, author: post.author}]});
              updatePost({ ...post, bookmarks: [...post.bookmarks, {author: user.uid}] });
             }else{
              updateUser({
                ...userData,
                bookmarks: bookmarkpost.map((b) =>
                  b.post === post._id ? { ...b, state: !b.state } : b
                ),
              }) }
          }




    return (
        <div key={post._id} className="post">
          <UserInfo post={post} />
          <p>{post.text}</p>
          <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
            {post.images && <img style={{width:"90%",borderRadius:"5px"}} src={post.images} alt="post image" />}
          </div>
          <div className="interaction">
            <div className="commentpost">
              <img src={commentpost} onClick={openModal} alt="" />
              <span>{post.comments.length} тыс.</span>
            </div>
            <Modal show={isModalVisible} onClose={closeModal} comments={comments} />
            <div className="repostpost">
              <img onClick={() => therepostpost(post)} 
              src={userData?.reposts?.some(e => e.post === post._id && e.state) ? repostpostactive : repostpost} 
              alt="" />
              <span>{post.reposts && post.reposts.length} тыс.</span>
            </div>
            <div className="likepost">
              <img onClick={() => thelikepost(post)}
                src={userData?.likesPosts?.some(e => e.post === post._id && e.state) ? likepostactive : likepost}
                alt="" />
              <span>{post.likes} тыс.</span>
            </div>
            <div className="bookmarkpost">
            <img 
              onClick={() => thebookmarkpost(post)}   
              src={userData?.bookmarks?.some(e => e.post === post._id && e.state) ? bookmarkactive : bookmarkpost} 
              alt="" 
            />
            </div>
          </div>
        </div>
    );
}

export default CenterContentPosts;
