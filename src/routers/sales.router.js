const express = require('express');
const salesControler = require('../controllers/sales.controller');
const salesValitade = require('../middlewares/salesValidate');

const router = express.Router();

router.put('/:id',
  salesValitade.quantityValidation,
  salesValitade.productIdValidation,
  salesValitade.salesValitation,
  salesControler.attCurrentSale);
router.post('/',
  salesValitade.quantityValidation,
  salesValitade.productIdValidation,
  salesControler.addNewSale);
router.get('/:id', salesControler.showSaleById);
router.get('/', salesControler.showSales);

router.delete('/:id', salesControler.deleteSale);
module.exports = router;
