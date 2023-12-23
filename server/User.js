const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: null,
    },
    posts: [
        {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;


