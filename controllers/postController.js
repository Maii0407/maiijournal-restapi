const { body, validationResult } = require( 'express-validator' );

const Post = require( '../models/post' );

exports.postList = ( req, res ) => {
  res.send( 'Post List GET' );
};

exports.postDetail = ( req, res ) => {
  res.send( 'Post Detail GET' );
};

exports.postCreate = [
  body( 'title', 'Title is required' ).trim().isLength({ min: 1 }).escape(),
  body( 'content', 'Content is required' ).trim().isLength({ min: 1 }).escape(),
  body( 'postStatus', 'Post Status is required' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      postStatus: req.body.postStatus,
      date: new Date(),
      user: req.user._id,
      category: 'empty'
    }).save( err => {
      if( err ) { return next( err ); }

      return res.json({ message: 'Post Create Success' });
    })
  }
];

exports.postDelete = ( req, res ) => {
  res.send( 'Post Delete DELETE' );
};

exports.postUpdate = ( req, res ) => {
  res.send( 'Post Update PUT' );
};