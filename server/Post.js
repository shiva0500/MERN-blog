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
      imageUrl: {
        type: String,
        default: null,
      },
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
