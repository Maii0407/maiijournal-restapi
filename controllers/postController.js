const Post = require( '../models/post' );

exports.postList = ( req, res ) => {
  res.send( 'Post List GET' );
};

exports.postDetail = ( req, res ) => {
  res.send( 'Post Detail GET' );
};

exports.postCreate = ( req, res ) => {
  res.send( 'Post Create POST' );
};

exports.postDelete = ( req, res ) => {
  res.send( 'Post Delete DELETE' );
};

exports.postUpdate = ( req, res ) => {
  res.send( 'Post Update PUT' );
};