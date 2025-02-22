import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  comments: string[]; // Здесь предполагаем, что передаются комментарии
}

const Modal: React.FC<ModalProps> = ({ show, onClose, comments }) => {
  if (!show) return null; // Не показываем, если show = false

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>Комментарии</h2>
        <ul>
          {comments.map((comment, index) => (
            <li style={{color:"black"}} key={index}>{comment}</li>
          ))}
        </ul>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

// Стили для модального окна
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
};

export default Modal;
