const { idSchema } = require('./schemas');
const { productsModel } = require('../../models');

const validateProductId = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { type: 404, message: 'Product not found' };

  return { type: null, message: '' };
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 404, message: '"id" must be a number' };

  return { type: null, message: '' };
};

module.exports = {
  validateProductId,
  validateId,
};
