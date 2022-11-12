const { productsModel } = require('../models');
const { validateProductId } = require('./validations/validationProducts');

const getProducts = async () => {
  const result = await productsModel.getProducts();
  return { type: null, message: result };
};

const getProductById = async (productId) => {
  const errorInputValue = await validateProductId(productId);
  if (errorInputValue.type) return errorInputValue;

  const result = await productsModel.findById(productId);
  return { type: null, message: result };
};

module.exports = {
  getProducts,
  getProductById,
};
