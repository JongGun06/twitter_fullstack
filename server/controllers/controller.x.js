const { User, Post, Message, Notice, Chat } = require('../models/model.x.js');
const cloudinary = require('cloudinary').v2;

async function createChat(req, res) {
  try {
    const {  text, author, createDate, idd } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!author || !text) {
      return res.status(400).json({ error: "Author and text are required" });
    }

    const newPost = await Chat.create({
      idd: idd,
      text: text,
      author: author,
      createDate: createDate,
      img: imagePath,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error details:', error);  // Выводим всю ошибку для отладки
    res.status(500).json({ error: error.message || 'Something went wrong!' });
  }
}




async function getChat(req, res) {
  try {
    const chat = await Chat.find({});
    console.log("Users:", chat);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getChatt(req, res) {
  try {
    const chats = await Chat.find({ idd: req.params.idd });
    if (!chats.length) {
      return res.status(404).json({ error: "No chats found" });
    }
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createUser(req, res) {
  try {
    const { email, googleId, name, avatar, registrationDate } = req.body; 
    if (!email || !googleId || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = await User.create({
      googleId,
      name,
      email, 
      avatar,
      registrationDate: registrationDate || new Date().toISOString(),
      subscriptions: [],
      subscribers: [],
      likesPosts: [],
      bookmarks: [],
      messages:[],
      reposts: [],
      posts: []
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getUser(req, res) {
  try {
    const users = await User.find({});
    console.log("Users:", users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getUserr(req, res) {
  try {
    let { googleId } = req.params;
    const user = await User.findOne({ googleId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) updates.avatar = req.file.path;  // Обновление аватара

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function createPost(req, res) {
    try {
      const { author, text, createDate } = req.body;
      const imagePath = req.file ? req.file.path : null;
  
      if (!author || !text) {
        return res.status(400).json({ error: "Author and text are required" });
      }
  
      const newPost = await Post.create({
        author: author,
        text: text,
        images: imagePath,
        createDate: createDate,
        likes:0,
        comments:[],
        reposts:[],
        bookmarks:[]
      });
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error details:', error);  // Выводим всю ошибку для отладки
      res.status(500).json({ error: error.message || 'Something went wrong!' });
    }
}
  

async function getPost(req, res) {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
}
async function getPostt(req, res) {
  try {
    let {id} = req.params
    const posts = await Post.findById(id);
    res.status(200).json(posts);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
}

async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) updates.images = req.file.path;  // Обновление изображения

    const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





async function updateMessage(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body; // Получаем все обновления
    let imageUrl = null;

    // Проверяем, был ли загружен файл (изображение)
    if (req.file) {
      // Загружаем изображение в Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadedImage.secure_url; // получаем URL изображения
    }
    if (imageUrl) {
      updates.img = imageUrl;
    }
    const updatedMessage = await Message.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    // Обработка ошибок
    res.status(500).json({ error: error.message });
  }
}

// Message Controllers
async function sendMessage(req, res) {
  try {
    const { sender, receiver, id, createDate } = req.body;
    const newMessage = await Message.create({
      sender,
      receiver,
      id,
      messages:[],
      createDate,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getMessages(req, res) {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getMessage(req, res) {
  try {
    let { id } = req.params; // Берём id из params, а не body!

    if (!id) {
      return res.status(400).json({ error: "Message ID is required" });
    }

    const message = await Message.findOne({ id: id }); 
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




async function deleteMessage(req, res) {
  try {
    // const _id = req.body;
    const {id} = req.params;

    const result = await Message.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Message not found" });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function updateMessage(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    let imageUrl = null;

    // Проверяем, был ли загружен файл (изображение)
    if (req.file) {
      // Загружаем изображение в Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadedImage.secure_url; // получаем URL изображения
    }

    // Если изображение загружено, добавляем его в сообщение
    if (imageUrl) {
      updates.img = imageUrl;
    }

    const updatedMessage = await Message.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedMessage) return res.status(404).json({ error: "Message not found" });
    
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



async function createNotice(req, res) {
  try {
    const { user, type, post, fromUser } = req.body;
    const newNotice = await Notice.create({
      user,
      type,
      post,
      fromUser,
      createDate: new Date().toISOString(),
      read: false
    });
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getNotices(req, res) {
  try {
    const notices = await Notice.find({});
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteNotice(req, res) {
  try {
    const { id } = req.params;
    const result = await Notice.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Notice not found" });
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function updateNotice(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedNotice = await Notice.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedNotice) return res.status(404).json({ error: "Notice not found" });
    res.status(200).json(updatedNotice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  // User
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getUserr,

  // Post
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPostt,

  // Message
  sendMessage,
  getMessages,
  getMessage,
  deleteMessage,
  updateMessage,

  // Notice
  createNotice,
  getNotices,
  deleteNotice,
  updateNotice,


  //chat
  getChat,
  createChat,
  getChatt
};
