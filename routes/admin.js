const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport' );
const jwtStrategy = require( '../auth/jwt' );
passport.use( jwtStrategy );

const userController = require( '../controllers/userController' );
const postController = require( '../controllers/postController' );
const commentController = require( '../controllers/commentController' );
const categoryController = require( '../controllers/categoryController' );

module.exports = router;