const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        default: null,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
