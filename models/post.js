const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date
  },
  postStatus: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

PostSchema.pre( 'remove', function( next ) {
  this.model( 'Comment' ).deleteMany({ post: this._id }, next);
});

module.exports = mongoose.model( 'Post', PostSchema );