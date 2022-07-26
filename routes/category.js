const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport' );
const jwtStrategy = require( '../auth/jwt' );
passport.use( jwtStrategy );

const controller = require( '../controllers/categoryController' );

router.post( '/create', passport.authenticate( 'jwt', { session: false } ), controller.categoryCreate );

router.get( '/list', controller.categoryList );

router.get( '/:categoryId', controller.categoryDetail );

router.delete( '/:categoryId', passport.authenticate( 'jwt', { session: false } ), controller.categoryDelete );

router.put( '/:categoryId', passport.authenticate( 'jwt', { session: false } ), controller.categoryUpdate );

module.exports = router;