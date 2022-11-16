const { productsModel } = require('../../models');
const { NOT_FOUND } = require('../../utils/errorMap');

const validateProductId = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { type: NOT_FOUND, message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateProductId,

};
