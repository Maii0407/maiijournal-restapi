const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20
  }
});

CategorySchema.pre( 'deleteOne', { document: true, query: false }, function( next ) {
  this.model( 'Post' ).deleteMany({ category: this._id }, next);
});

module.exports = mongoose.model( 'Category', CategorySchema );