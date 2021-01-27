var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main', pageTitle: 'Sklep internetowy', komunikat: false});
});

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/register', AuthController.registerForm)
router.post('/register', AuthController.register);


module.exports = router;
