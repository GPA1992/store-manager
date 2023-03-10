const { productsModel } = require('../models');
const { validateProductId } = require('./validations/products.validate');
const { NOT_FOUND } = require('../utils/errorMap');

const getProducts = async () => {
  const result = await productsModel.getProducts();
  if (!result) return { type: NOT_FOUND, message: 'Não existe uma lista de produtos' };
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
  if (!productId) return { type: NOT_FOUND, message: 'Não foi inserido um produto' };
  return { type: null, message: { ...product, id: productId } };
};

const editProduct = async (productId, newProductName) => {
  const errorInputValue = await validateProductId(productId);
  if (errorInputValue.type) return errorInputValue;
  const { name } = newProductName;
  const changedProduct = await productsModel.editProductById(productId, name);

  return { type: null, message: changedProduct };
};

const deleteProduct = async (productId) => {
  const errorInputValue = await validateProductId(productId);
  if (errorInputValue.type) return errorInputValue;
  const deleteProductById = await productsModel.deleteProductById(productId);

  return { type: null, message: deleteProductById };
};

const searchProduct = async (productName) => {
  const allProducts = await productsModel.getProducts();
  const productFilterByName = allProducts.filter((p) => p.name.includes(productName));
  return { type: null, message: productFilterByName };
};

module.exports = {
  getProducts,
  getProductById,
  insertNewProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
