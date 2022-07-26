const express = require( 'express' );
const router = express.Router();

const passport = require( 'passport' );
const jwtStrategy = require( '../auth/jwt' );
passport.use( jwtStrategy );

const controller = require( '../controllers/postController' );

router.get( '/protectedtest', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
  return res.status( 200 ).json( 'Test succeeded' );
});

module.exports = router;

