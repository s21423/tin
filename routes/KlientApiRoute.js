const express = require('express');
const router = express.Router();

const klientApiController = require('../api/KlientAPI');

router.get('/', klientApiController.getKlients);
router.get('/:empId', klientApiController.getKlientById);
router.post('/', klientApiController.createKlient);
router.put('/:empId', klientApiController.updateKlient);
router.delete('/:empId', klientApiController.deleteKlientById);

module.exports = router;