import { FC, useState } from "react";
import { IPost } from "../../../redux/model/IPost";
import { IUser } from "../../../redux/model/IUser";
import UserInfo from "../UserInfo";
import commentpost from "../../../img/commentpost.png";
import repostpost from "../../../img/repostpost.png";
import repostpostactive from "../../../img/repostpostactive.png";
import likepost from "../../../img/likepost.png";
import bookmarkpost from "../../../img/bookmarkpost.png";
import bookmarkactive from "../../../img/bookmarkactive.png";
import likepostactive from "../../../img/likepostactive.png";
import Modal from "../../ModalComment/Modal";
import { postApi } from "../../../redux/services/PostAction";
import { userApi } from "../../../redux/services/UserAction";

interface CenterContentPostsProps {
  post: IPost;
  userData: IUser | undefined;
  user: any;
}

const CenterContentPosts: FC<CenterContentPostsProps> = ({ post, userData, user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatePost] = postApi.useUpdatePostMutation();
  const [updateUser] = userApi.useUpdateUserMutation();

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const thelikepost = async (post: IPost) => {
    if (!userData) return;
    const likesPosts = userData.likesPosts || [];
    const postAlreadyLiked = likesPosts.some((like) => like.post === post._id);

    try {
      if (!postAlreadyLiked) {
        await updatePost({ ...post, likes: post.likes + 1 });
        await updateUser({
          ...userData,
          //@ts-ignore
          likesPosts: [...likesPosts, {post: post._id, author: post.author }],
        });
      } else {
        await updatePost({ ...post, likes: post.likes - 1 });
        await updateUser({
          ...userData,
          likesPosts: likesPosts.filter((like) => like.post !== post._id),
        });
      }
    } catch (error) {
      console.error("Ошибка при обновлении лайка:", error);
    }
  };

  const therepostpost = async (post: IPost) => {
    if (!userData) return;
    const reposts = userData.reposts || [];
    const postAlreadyReposted = reposts.some((repost) => repost.post === post._id);

    try {
      if (!postAlreadyReposted) {
        await updateUser({
          ...userData,
          //@ts-ignore
          reposts: [...reposts, { post: post._id, author: post.author }],
        });
        await updatePost({
          ...post,
          reposts: [...post.reposts, { author: user.uid }],
        });
      } else {
        await updateUser({
          ...userData,
          reposts: reposts.filter((repost) => repost.post !== post._id),
        });
        await updatePost({
          ...post,
          reposts: post.reposts.filter((repost) => repost.author !== user.uid),
        });
      }
    } catch (error) {
      console.error("Ошибка при обновлении репоста:", error);
    }
  };

  const thebookmarkpost = async (post: IPost) => {
    if (!userData) return;
    const bookmarks = userData.bookmarks || [];
    const postAlreadyBookmarked = bookmarks.some((bookmark) => bookmark.post === post._id);

    try {
      if (!postAlreadyBookmarked) {
        await updateUser({
          ...userData,
          //@ts-ignore
          bookmarks: [...bookmarks, { post: post._id, author: post.author }],
        });
        await updatePost({
          ...post,
          bookmarks: [...post.bookmarks, { author: user.uid }],
        });
      } else {
        await updateUser({
          ...userData,
          bookmarks: bookmarks.filter((bookmark) => bookmark.post !== post._id),
        });
        await updatePost({
          ...post,
          bookmarks: post.bookmarks.filter((bookmark) => bookmark.author !== user.uid),
        });
      }
    } catch (error) {
      console.error("Ошибка при обновлении закладки:", error);
    }
  };

  return (
    <div key={post._id} className="post">
      <UserInfo post={post} />
      <p>{post.text}</p>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {post.images && (
          <img
            style={{ width: "90%", borderRadius: "5px" }}
            src={post.images}
            alt="post image"
          />
        )}
      </div>
      <div className="interaction">
        <div className="commentpost">
          <img src={commentpost} onClick={openModal} alt="" />
          <span>{post.comments.length} тыс.</span>
        </div>
        <Modal
          show={isModalVisible}
          post={post._id}
          onClose={closeModal}
          currentUserId={user?.uid} // Передаем ID текущего пользователя
        />
        <div className="repostpost">
          <img
            onClick={() => therepostpost(post)}
            src={userData?.reposts?.some((e) => e.post === post._id) ? repostpostactive : repostpost}
            alt="Repost"
          />
          <span>{post.reposts?.length} тыс.</span>
        </div>
        <div className="likepost">
          <img
            onClick={() => thelikepost(post)}
            src={userData?.likesPosts?.some((e) => e.post === post._id) ? likepostactive : likepost}
            alt="Like"
          />
          <span>{post.likes} тыс.</span>
        </div>
        <div className="bookmarkpost">
          <img
            onClick={() => thebookmarkpost(post)}
            src={userData?.bookmarks?.some((e) => e.post === post._id) ? bookmarkactive : bookmarkpost}
            alt="Bookmark"
          />
        </div>
      </div>
    </div>
  );
};

export default CenterContentPosts;