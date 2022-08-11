const { body, validationResult } = require( 'express-validator' );

const Comment = require( '../models/comment' );

exports.allComments = async ( req, res ) => {
  const comments = await Comment.find().sort({ date: -1 });

  return res.json({ comments });
};

exports.commentList = async ( req, res ) => {
  const comments = await Comment.find({ post: req.params.postId });

  return res.json({ comments });
};

exports.commentDetail = async ( req, res ) => {
  const comment = await Comment.findById( req.params.commentId );

  return res.json({ comment });
};

exports.commentCreate = [
  body( 'username', 'Username is required' ).trim().isLength({ min: 1 }).escape(),
  body( 'content', 'Username is required' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    const comment = new Comment({
      username: req.body.username,
      content: req.body.content,
      date: new Date(),
      post: req.params.postId
    }).save( err => {
      if( err ) { return next( err ); }

      return res.json({ message: 'Comment Created' })
    })
  }
];

exports.commentDelete = async ( req, res ) => {
  const comment = await Comment.findById( req.params.commentId );

  if( comment ) {
    await comment.deleteOne();

    return res.json({ message: 'Comment Deleted' });
  }

  return res.json({
    message: 'Comment Delete Failed',
    comment
  });
};