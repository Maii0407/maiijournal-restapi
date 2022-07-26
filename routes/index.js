var express = require('express');
var router = express.Router();

const userController = require( '../controllers/userController' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'maiiJournal-restAPI' });
});

router.post( '/superSecretSignUp', userController.userCreate );
router.post( '/superSecretAdminLogin', userController.userLogin );

module.exports = router;
