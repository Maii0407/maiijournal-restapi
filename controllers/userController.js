const { body, validationResult } = require( 'express-validator' );
const bcrypt = require( 'bcryptjs' );

const jwt = require( 'jsonwebtoken' );

const User = require( '../models/user' );

exports.userCreate = [
  body( 'userID' ).trim().isLength({ min: 1 }).escape().withMessage( 'UserID must be specified.' )
    .isAlphanumeric().withMessage( 'UserID has non-alphanumeric characters.' ),
  body( 'password' ).trim().isLength({ min: 1 }).escape().withMessage( 'Password must be specified' ),

  ( req, res, next ) => {
    const errors = validationResult( req );

    bcrypt.hash( `${ req.body.password }`, 10, ( err, hashedPassword ) => {
      if( err ) {
        return next( err );
      }

      const user = new User({
        userID: req.body.userID,
        password: hashedPassword
      }).save( err => {
        if( err ) { return next( err ); }

        res.json({ message: 'SignUp Success' });
      })
    })
  }
];

exports.userLogin = async ( req, res, next ) => {
  const user = await User.findOne({ userID: req.body.userID });

  try {
    const found = await bcrypt.compare( req.body.password, user.password );
    const opts = {};
    opts.expiresIn = '1h' //token expires in 1 hour
    const secret = process.env.SECRETORKEY;
    const token = jwt.sign({ userID: user.userID }, secret, opts);

    if( found ) {
      return res.status(200).json({
        message: 'Auth Passed',
        token
      });
    }
    else {
      return res.status(401).json({ message: 'Auth Failed' });
    }
  }
  catch( err ) {
    return res.json( err );
  }
};