const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const User = require('./User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const salt = bcrypt.genSaltSync(10);
const secret = 'dgnkjfsbgkjrbgflkfjgbkfjvkfjbg';

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://doddishiva055:879n3DvngB5Je26X@cluster0.hcqa1vq.mongodb.net/?retryWrites=true&w=majority');


app.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const UserDoc = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(UserDoc);

    } catch (error) {
        res.status(400).json(error);
        console.error(error);
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });

        if (!userDoc) {
            return res.status(400).json('Invalid details');
        }

        const passok = bcrypt.compareSync(password, userDoc.password);
        if (passok) {
            jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id: userDoc._id,
                    email,
                });
            });
        } else {
            res.status(400).json('Invalid details');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token').json('logged out');
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

//879n3DvngB5Je26X
//mongodb+srv://doddishiva055:879n3DvngB5Je26X@cluster0.hcqa1vq.mongodb.net/?retryWrites=true&w=majority