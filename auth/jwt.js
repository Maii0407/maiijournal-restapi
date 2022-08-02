const dotenv = require( 'dotenv' );
dotenv.config();

const User = require( '../models/user' );
const bcrypt = require( 'bcryptjs' );
const JwtStrategy = require( 'passport-jwt' ).Strategy;
const ExtractJwt = require( 'passport-jwt' ).ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

module.exports = new JwtStrategy( opts, async ( jwt_payload, done ) => {
  const user = await User.findOne({ userID: jwt_payload.userID });

  if( jwt_payload.userID === process.env.MAIIUSER ) {
    return done( null, user );
  }

  return done( null, false );
});