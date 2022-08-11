const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport' );
const jwtStrategy = require( '../auth/jwt' );
passport.use( jwtStrategy );

const userController = require( '../controllers/userController' );
const postController = require( '../controllers/postController' );
const commentController = require( '../controllers/commentController' );
const categoryController = require( '../controllers/categoryController' );

router.post( '/superSecretAdminLogin', userController.userLogin );

router.post( '/create',
  passport.authenticate( 'jwt', { session: false }),
  postController.postCreate
);

router.get( '/allposts',
  passport.authenticate( 'jwt', { session: false }),
  postController.postList
);

router.get( '/allcomments',
  passport.authenticate( 'jwt', { session: false }),
  commentController.allComments
);

module.exports = router;