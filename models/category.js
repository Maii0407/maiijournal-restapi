const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20
  }
});

module.exports = mongoose.model( 'Category', CategorySchema );