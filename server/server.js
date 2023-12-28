const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3001;
const User = require('./User');
const Post = require('./Post');
const mongoose = require('mongoose');
const multer = require('multer');
const { ObjectId } = require('mongoose').mongo;


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

const UserImgstorage = multer.diskStorage({
  destination: './UserImguploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const UserImgupload = multer({ storage: UserImgstorage });

app.use('/UserImguploads', express.static('UserImguploads'));

app.post('/userimg', UserImgupload.single('file'), async (req, res) => {
  try {
    const userEmail = req.body.email;
    
    if (!userEmail || !req.file) {
      console.error('Invalid request. Please provide useremail and file.');
      return res.status(400).send('Invalid request');
    }

    const userImg = `/UserImguploads/${req.file.filename}`;

    const userDoc = await User.findOne({ email: userEmail });

    if (userDoc) {
      userDoc.imageUrl = userImg;
      await userDoc.save();
      console.log('User document updated successfully');
      return res.status(200).send('Image uploaded successfully');
    } else {
      console.error('User not found');
      return res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).send('Internal Server Error');
  }
});


app.get('/getuser', async (req, res) => {

  try {
    const { email } = req.query;
    const UserDoc = await User.findOne({ email }).populate('posts');
    if (UserDoc) {
      res.status(200).json({
        name: UserDoc.username,
        email: UserDoc.email,
        profilePic: UserDoc.imageUrl,
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



app.post('/post', upload.single('file'), async (req, res) => {
  try {
    const { title, description, summary, email, username } = req.body;
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
      .sort({ createdAt: 'desc' })
      .limit(20);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.send('Internal Server Error');
  }
});

app.delete('/deletepost/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete({ _id: postId });
    await User.updateOne(
      { posts: postId }, // Criteria to find the user
      { $pull: { posts: postId } } // Remove the specified post from the array
    );

    res.status(200).send('Deleted');
  } catch (error) {
    console.error('errorrrrr', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/getpost/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById({ _id: postId });
    res.status(200).json(post);
  } catch (error) {
    console.error('errorrrrr', error);
    res.status(500).send('Internal Server Error');
  }
});



const updatestorage = multer.diskStorage({
  destination: './updateduploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const updatedfile = multer({ storage: updatestorage });

app.use('/updateduploads', express.static('updateduploads'));


app.post('/update/:postId', updatedfile.single('file'), async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, description, summary } = req.body;
    const imageUrl = req.file ? `/updateduploads/${req.file.filename}` : null;

    const updatedPost = {
      title,
      description,
      summary,
      imageUrl,
      createdAt: new Date(),
    };

    // Find the existing post by ID and update its fields
    await Post.findByIdAndUpdate(postId, updatedPost);

    res.status(200).send('Post updated successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

