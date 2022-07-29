const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport' );
const jwtStrategy = require( '../auth/jwt' );
passport.use( jwtStrategy );

const controller = require( '../controllers/commentController' );

router.get( '/list', controller.commentList );

router.post( '/create', controller.commentCreate );

router.get( '/:commentId', controller.commentDetail );

router.delete( '/:commentId', passport.authenticate( 'jwt', { session: false }), controller.commentDelete );

module.exports = router;