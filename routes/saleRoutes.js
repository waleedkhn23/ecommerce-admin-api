const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.post('/', saleController.addSale);
router.get('/', saleController.getSales);
router.get('/summary', saleController.getRevenueSummary);


module.exports = router;
