const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3001;
const User = require('./User');
const Post = require('./Post');
const mongoose = require('mongoose');
const multer = require('multer');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://doddishiva055:WfZXv4SixdECpDeE@cluster0.dircrdk.mongodb.net/?retryWrites=true&w=majority');


app.post('/signin', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send("please enter details");
    return;
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send('User already exists');
      return;
    }
    const NewUser = new User({ username, email, password });
    await NewUser.save();
    res.send("user created successfully");
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }

});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).send('Please enter valid email or password');
    return;
  }
  try {
    const UserDoc = await User.findOne({ email });
    if (!UserDoc) {
      res.send("email not found");
      return;
    }
    if (UserDoc.password !== password) {
      res.send("password is incorrect");
      return;
    }

    res.send(UserDoc);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send('Server error');
  }
});

app.get('/getuser', async (req, res) => {
  const useremail = req.body;
  try {
   
    const UserDoc = await User.findOne({ email });
    console.log(UserDoc);
    if (UserDoc) {
      res.status(200).json({
        name: UserDoc.username,
        email: UserDoc.email,
        posts: UserDoc.posts, 
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

// Express middleware to parse JSON and urlencoded request bodies


app.post('/post', upload.single('file'), async (req, res) => {
  try {
    const { title, description, summary, email ,username } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      title,
      description,
      summary,
      imageUrl,
      username,
      createdAt: new Date(),
    });

    await newPost.save();
    console.log(newPost);

    const userDoc = await User.findOne({ email });

    if (userDoc) {
      userDoc.posts.push(newPost._id);
      await userDoc.save();
      res.send('Post created successfully');
    } else {
      res.send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/getposts', async (req, res) => {
  try {
    const posts = await Post.find()
    .sort({createdAt: 'desc'})
    .limit(20);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.send('Internal Server Error' );
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

