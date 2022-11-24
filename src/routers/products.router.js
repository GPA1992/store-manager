const express = require('express');

const productsControler = require('../controllers/products.controller');
const productsValitade = require('../middlewares/productsValitade');

const router = express.Router();

router.get('/', productsControler.listProducts);
router.get('/:id', productsControler.getProduct);
router.put('/:id', productsValitade.productNameValidation, productsControler.changedProductById);
router.get('/search', productsControler.searchProductByname);
router.post('/', productsValitade.productNameValidation, productsControler.addProduct);
router.delete('/:id', productsControler.deleteProduct);

module.exports = router;
