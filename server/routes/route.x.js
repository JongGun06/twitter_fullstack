// routes/route.x.js
const express = require('express');
const { upload } = require('../middleware/upload');
const router = express.Router();
const {
  createUser,
  getUser,
  getUserr,
  deleteUser, // Убедитесь, что контроллер использует асинхронную функцию
  updateUser,
  createPost,
  getPost,
  getPostt,
  deletePost, // Убедитесь, что контроллер использует асинхронную функцию
  updatePost,
  sendMessage,
  getMessages,
  deleteMessage, // Убедитесь, что контроллер использует асинхронную функцию
  updateMessage,
  getMessage,
  createNotice,
  getNotices,
  deleteNotice, // Убедитесь, что контроллер использует асинхронную функцию
  updateNotice,
  getChat,
  createChat,
  getChatt
} = require('../controllers/controller.x');

//chat
router.get('/chat', getChat);
router.get('/chat/:idd', getChatt);
router.post('/chat', upload.single('img'), createChat);

// User Routes
router.get('/users', getUser);
router.post('/users', upload.single('avatar'), createUser);
router.delete('/users/:id', deleteUser); // Используется асинхронная функция для удаления
router.put('/users/:id', upload.single('avatar'), updateUser);
router.get('/users/:googleId', getUserr);


// Post Routes
router.get('/posts', getPost);
router.get('/posts/:id', getPostt);
router.post('/posts', upload.single('images'), createPost);
router.delete('/posts/:id', deletePost); // Используется асинхронная функция для удаления
router.put('/posts/:id', upload.single('images'), updatePost);

// Message Routes
router.get('/messages', getMessages);
router.get('/messages/:id', getMessage);
router.post('/messages', sendMessage);
router.delete('/messages/:id', deleteMessage); // Используется асинхронная функция для удаления
router.put('/messages/:id', updateMessage);

// Notice Routes
router.get('/notices', getNotices);
router.post('/notices', createNotice);
router.delete('/notices/:id', deleteNotice); // Используется асинхронная функция для удаления
router.put('/notices/:id', updateNotice);

module.exports = router;
