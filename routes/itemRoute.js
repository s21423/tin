const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/', itemController.showItemList);
router.get('/details/:itemId', itemController.showItemDetails);
router.get('/add', itemController.addItemForm);
router.get('/edit/:itemId', itemController.editItemForm);

router.post('/add', itemController.addItem);
router.post('/edit/:itemId', itemController.updateItem);
router.get('/delete/:itemId', itemController.deleteItem);


module.exports = router;
