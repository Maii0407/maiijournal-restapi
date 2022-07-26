const Comment = require( '../models/comment' );

exports.commentList = ( req, res ) => {
  res.send( 'Comment List GET' );
};

exports.commentDetail = ( req, res ) => {
  res.send( 'Comment Detail GET' );
};

exports.commentCreate = ( req, res ) => {
  res.send( 'Comment Create POST' );
};

exports.commentDelete = ( req, res ) => {
  res.send( 'Comment Delete DELETE' );
};

exports.commentUpdate = ( req, res ) => {
  res.send( 'Comment Update PUT' );
};