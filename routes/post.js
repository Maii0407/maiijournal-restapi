const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport' );
const jwtStrategy = require( '../auth/jwt' );
passport.use( jwtStrategy );

const controller = require( '../controllers/postController' );

router.get( '/all', controller.postList );

router.get( '/list', controller.postPublic );

router.post( '/create', passport.authenticate( 'jwt', { session: false } ), controller.postCreate );

router.get( '/:postId', controller.postDetail );

router.delete( '/:postId', passport.authenticate( 'jwt', { session: false } ), controller.postDelete );

router.put( '/:postId', passport.authenticate( 'jwt', { session: false } ), controller.postUpdate );

module.exports = router;

