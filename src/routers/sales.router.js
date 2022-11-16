const express = require('express');
const salesControler = require('../controllers/sales.controller');
const salesValitade = require('../middlewares/salesValidate');

const router = express.Router();

router.post('/',
  salesValitade.quantityValidation,
  salesValitade.productIdValidation,
  salesControler.addNewSale);

module.exports = router;
