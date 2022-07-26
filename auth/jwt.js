const dotenv = require( 'dotenv' );
dotenv.config();

const bcrypt = require( 'bcryptjs' );
const JwtStrategy = require( 'passport-jwt' ).Strategy;
const ExtractJwt = require( 'passport-jwt' ).ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

module.exports = new JwtStrategy( opts, ( jwt_payload, done ) => {
  if( jwt_payload.userID === process.env.MAIIUSER ) {
    return done( null, true );
  }

  return done( null, false );
});