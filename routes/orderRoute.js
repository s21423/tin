const express = require('express');
const router = express.Router();

const userController = require('../controllers/orderController');

router.get('/', userController.showOrderList);
router.get('/add', userController.addOrderForm);
router.get('/edit/:orderId', userController.editOrderForm);
router.get('/details/:orderId', userController.showOrderDetails);

router.post('/add', userController.addOrder);
router.post('/edit/:orderId', userController.updateOrder);
router.get('/delete/:orderId', userController.deleteOrder);

module.exports = router;
