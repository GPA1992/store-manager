const express = require('express');
const salesControler = require('../controllers/sales.controller');
const salesValitade = require('../middlewares/salesValidate');

const router = express.Router();

  router.post('/',
  salesValitade.quantityValidation,
  salesValitade.productIdValidation,
    salesControler.addNewSale);

  router.get('/:id', salesControler.showSaleById);

  router.get('/', salesControler.showSales);

  router.delete('/:id', salesControler.deleteSale);

  router.put('/:id',
  salesValitade.quantityValidation,
  salesValitade.productIdValidation,
  salesValitade.salesValitation,
  salesControler.attCurrentSale);

module.exports = router;
