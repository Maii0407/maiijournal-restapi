const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model( 'User', UserSchema );