const express = require('express');
const router = express.Router();

const itemApiController = require('../api/ItemAPI');

router.get('/', itemApiController.getItems);
router.get('/:empId', itemApiController.getItemById);
router.post('/', itemApiController.createItem);
router.put('/:empId', itemApiController.updateItem);
router.delete('/:empId', itemApiController.deleteItemById);


module.exports = router;