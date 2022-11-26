const { salesModel } = require('../../models');
const { NOT_FOUND } = require('../../utils/errorMap');
const { productsModel } = require('../../models');

const saleIdValidate = async (saleId) => {
  const sale = await salesModel.salesById(saleId);
  if (sale.length === 0) return { type: NOT_FOUND, message: 'Sale not found' };
  return { type: null, message: '' };
};

const productValidationToNewSale = async (saleItems) => {
  const allProducts = await productsModel.getProducts();
  const productVerify = saleItems.every((sale) => allProducts.some((product) =>
    product.id === sale.productId));
  console.log(productVerify);
  if (!productVerify) return { type: NOT_FOUND, message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  saleIdValidate,
  productValidationToNewSale,
};
