const { productsModel } = require('../models');
const { validateProductId } = require('./validations/products.validate');

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

const insertNewProduct = async (product) => {
  const productId = await productsModel.insertProduct(product);
  return { type: null, message: { ...product, id: productId } };
};

module.exports = {
  getProducts,
  getProductById,
  insertNewProduct,
};
