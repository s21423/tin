const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.showUserList);
router.get('/add', userController.showAddUserForm);
router.get('/edit/:klientId', userController.showEditKlientForm);
router.get('/details/:klientId', userController.showKlientDetails);

router.post('/add', userController.addUser);
router.post('/edit/:klientId', userController.updateUser);
router.get('/delete/:klientId', userController.deleteUser);

module.exports = router;
