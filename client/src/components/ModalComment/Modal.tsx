import React, { useState } from 'react';
import './modal.css';
import { postApi } from '../../redux/services/PostAction';
import sendicon from '../../img/sendicon.png';
import closeicon from '../../img/closeicon.png';


interface ModalProps {
  show: boolean;
  onClose: () => void;
  post: string | undefined;
  currentUserId: string | undefined;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, post, currentUserId }) => {
  const { data: postData, isLoading, isFetching, isError, error } = postApi.useGetPostQuery(post, { skip: !show || !post });
  const [updatePost] = postApi.useUpdatePostMutation();
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !postData || !currentUserId || isLoading || isFetching) return;
    
    const newComment = {
      text: commentText,
      author: currentUserId,
      createDate: new Date(),
    };

    const updatedComments = [...(postData.comments || []), newComment];

    try {
      await updatePost({
        ...postData,
        comments: updatedComments,
      });
      setCommentText('');
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  if (!show) return null;
  if (isLoading || isFetching) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки поста: {JSON.stringify(error)}</div>;

  return (
    <div className="modalOverlayStyle">
      <div style={{flexDirection:"column"}}  className="modalContentStyle">
        <img className='img' src={closeicon} onClick={onClose}/>
        <div style={{flexDirection:"column"}} >
          <div className="input">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Напишите комментарий..."
            />
            <img src={sendicon} onClick={handleCommentSubmit} alt="Send" />
          </div>
          <div style={{flexDirection:"column"}}  className="comments">
            {postData?.comments?.slice().reverse().map((comment, index) => (
              <div style={{flexDirection:"column"}}  key={index} className="comment">
                <p>{comment.text}</p>
                <span>
                  {new Date(comment.createDate).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;