const { BAD_REQUEST, INVALID_VALUE, NOT_FOUND } = require('../utils/errorMap');
const { productsModel } = require('../models/index');

async function productIdValidation(req, res, next) {
  const allProducts = await productsModel.getProducts();
  const { body } = req;
  const ifProductIdExist = body.every((sale) => 'productId' in sale);
  const productVerify = body.every((sale) => allProducts.some((product) =>
    product.id === sale.productId));
  if (!ifProductIdExist) {
    return res.status(BAD_REQUEST).json({
      message: '"productId" is required',
    });
  }
  if (!productVerify) {
    return res.status(NOT_FOUND).json({
      message: 'Product not found',
    });
  }
  return next();
}

function quantityValidation(req, res, next) {
const { body } = req;
  const quantityVerify = body.every((sale) => 'quantity' in sale);
  const quantityValueVerify = body.every((sale) => sale.quantity > 0);
  if (!quantityVerify) return res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
  if (!quantityValueVerify) {
    return res.status(INVALID_VALUE).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }
  return next();
}

 module.exports = {
   productIdValidation,
   quantityValidation,
  };
