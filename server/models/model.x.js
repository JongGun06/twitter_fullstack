const mongoose = require("mongoose");

// Схема для пользователей
let usersSchema = mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  avatar: { type: String },
  registrationDate: { type: String },
  subscriptions: [
    {
      user: { type: String },
      avatar: { type: String },
      name: { type: String },
    },
  ],
  subscribers: [
    {
      user: { type: String },
      avatar: { type: String },
      name: { type: String },
    },
  ],
  likesPosts: [
    {
      post: { type: String },
      author: { type: String },
      state: { type: Boolean, default: false },
    },
  ],
  messages: [
    {
      author: { type: String },
      messagesID: { type: String },
    },
  ],
  bookmarks: [
    {
      post: { type: String },
      author: { type: String },
      state: { type: Boolean, default: false },
    },
  ],
  reposts: [
    {
      post: { type: String },
      author: { type: String },
      state: { type: Boolean, default: false },
    },
  ],
  posts: [
    {
      post: { type: String },
      author: { type: String },
    },
  ],
});

// Схема для постов
let postSchema = mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  images: { type: String },
  createDate: { type: String },
  likes: { type: Number, default: 0 },
  comments: [
    {
      text: { type: String },
      author: { type: String },
      createDate: { type: Date, default: Date.now },
    },
  ],
  reposts: [
    {
      post_id: { type: String },
      author: { type: String },
      createDate: { type: String },
    },
  ],
  bookmarks: [
    {
      post_id: { type: String },
      author: { type: String },
      createDate: { type: Date, default: Date.now },
    },
  ],
});

// Схема для сообщений
let messageSchema = mongoose.Schema({
  id: { type: String },
  sender: { type: String },
  receiver: { type: String },

  createDate: { type: String },
});

let chatSchema = mongoose.Schema({
  idd: {type:String},
  text: { type: String },
  author: { type: String },
  createDate: { type: String },
  img: { type: String },
});

// Схема для уведомлений
let noticeSchema = mongoose.Schema({
  user: { type: String },
  type: { type: String, required: true },
  post: { type: String },
  fromUser: [
    {
      id_: { type: String },
      id_user: { type: String, required: true },
    },
  ],
  createDate: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

// Модели
let User = mongoose.model("User", usersSchema);
let Post = mongoose.model("Post", postSchema);
let Message = mongoose.model("Message", messageSchema);
let Notice = mongoose.model("Notice", noticeSchema);
const Chat = mongoose.model('Chat', chatSchema);


// Экспортируем модели
module.exports = { User, Post, Message, Notice,Chat };
