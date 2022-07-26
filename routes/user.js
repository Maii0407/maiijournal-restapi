var express = require('express');
var router = express.Router();

const controller = require( '../controllers/userController' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'maiiJournal-restAPI' });
});

router.post( '/superSecretSignUp', controller.userCreate );
router.post( '/superSecretAdminLogin', controller.userLogin );

module.exports = router;
