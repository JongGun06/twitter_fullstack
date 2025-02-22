// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const xRoute = require('./routes/route.x');
const { User } = require('./models/model.x');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/twitter', xRoute);

app.get('/', (req, res) => {
  res.send("Hello from API");
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.post("/api/twitter/users/check-existence", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ exists: !!user });
});


mongoose.connect("mongodb+srv://nagidevfullstack:Hadi2017g@twitterdatabase.kfhbx.mongodb.net/?retryWrites=true&w=majority&appName=TwitterDatabase")  
.then(() => {
    console.log('MongoDB connected');
    app.listen(7070, () => {
      console.log('Server is running on port 7070');
    });
  })
  .catch((err) => {
    console.log(err);
  });
