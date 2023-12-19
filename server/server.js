const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const User = require('./User');
const mongoose = require('mongoose');




app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://doddishiva055:WfZXv4SixdECpDeE@cluster0.dircrdk.mongodb.net/?retryWrites=true&w=majority');


app.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).send("please enter details");
        return;
    }
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(409).send('User already exists');
            return;
        }
        const NewUser = new User({ username, email, password});
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
        const UserDoc = await User.findOne({email});
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
        console.error('Error retrieving user:', err);
        res.status(500).send('Server error');
    }
});

app.get('/profile', (req, res) => {
    res.send("hlo")

});

app.post('/logout', (req, res) => {
    res.send("hlo")
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

//879n3DvngB5Je26X
//mongodb+srv://doddishiva055:879n3DvngB5Je26X@cluster0.hcqa1vq.mongodb.net/?retryWrites=true&w=majority