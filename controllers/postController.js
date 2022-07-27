const { body, validationResult } = require( 'express-validator' );

const Post = require( '../models/post' );

exports.postList = async ( req, res, next ) => {
  const posts = await Post.find().sort({ title: 1 });

  return res.json({ posts });
};

exports.postPublic = async ( req, res, next ) => {
  const posts = await Post.find({ postStatus: 'published' }).sort({ title: 1 });

  return res.json({ posts });
};

exports.postDetail = async ( req, res, next ) => {
  const post = await Post.findById( req.params.postId );

  return res.json({ post });
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
      category: req.body.category
    }).save( err => {
      if( err ) { return next( err ); }

      return res.json({ message: 'Post Create Success' });
    })
  }
];

exports.postDelete = async ( req, res, next ) => {
  const post = await Post.findById( req.params.postId )

  if( post ) {
    await post.deleteOne();
    return res.json({ message: 'Post Deleted' });
  }

  return res.json({
    message: 'Post Delete Failed',
    post
  })
};

exports.postUpdate = [
  body( 'title', 'Title is required' ).trim().isLength({ min: 1 }).escape(),
  body( 'content', 'Content is required' ).trim().isLength({ min: 1 }).escape(),
  body( 'postStatus', 'Post Status is required' ).trim().isLength({ min: 1 }).escape(),

  async ( req, res, next ) => {
    const errors = validationResult( req );

    if( !errors.isEmpty() ) {
      res.json({ errors: errors.array() });
      return;
    }
    else {
      const update = await Post.updateOne(
        { _id: req.params.postId },
        {
          title: req.body.title,
          content: req.body.content,
          date: new Date(),
          postStatus: req.body.postStatus,
          category: req.body.category
        }
      );

      if( update ) {
        return res.json({ message: 'Post Updated' });
      }

      return res.json({ message: 'Post Update Failed' });
    }
  }
];