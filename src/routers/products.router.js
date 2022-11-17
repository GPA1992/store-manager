const express = require('express');

const productsControler = require('../controllers/products.controller');
const productsValitade = require('../middlewares/productsValitade');

const router = express.Router();

router.put('/:id', productsValitade.productNameValidation, productsControler.changedProductById);
router.get('/', productsControler.listProducts);
router.get('/:id', productsControler.getProduct);
router.post('/', productsValitade.productNameValidation, productsControler.addProduct);

module.exports = router;
