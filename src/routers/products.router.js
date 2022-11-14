const express = require('express');

const productsControler = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsControler.listProducts);
router.get('/:id', productsControler.getProduct);
router.post('/', productsControler.addProduct);

module.exports = router;
