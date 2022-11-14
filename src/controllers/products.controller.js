const { productServices } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productServices.getProducts();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.getProductById(Number(id));
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
};
