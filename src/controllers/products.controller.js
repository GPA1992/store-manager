const { productServices } = require('../services');
const { CREATED, OK } = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productServices.getProducts();

  if (type) return res.status(type).json(message);

  res.status(OK).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.getProductById(Number(id));
  if (type) return res.status(type).json({ message });
  res.status(OK).json(message);
};

const addProduct = async (req, res) => {
  const { body } = req;
  const { type, message } = await productServices.insertNewProduct(body);
  if (type) return res.status(type).json({ message });
  res.status(CREATED).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  addProduct,
};
