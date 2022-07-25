const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: 20
  },
  content: {
    type: String,
    required: true,
    maxLength: 100
  },
  date: {
    type: Date
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

module.exports = mongoose.model( 'Comment', CommentSchema );