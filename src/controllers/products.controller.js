const { productServices } = require('../services');
const { CREATED, OK, NO_CONTENT } = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productServices.getProducts();
  if (type) return res.status(type).json(message);
  return res.status(OK).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.getProductById(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(OK).json(message);
};

const addProduct = async (req, res) => {
  const { body } = req;
  const { type, message } = await productServices.insertNewProduct(body);
  if (type) return res.status(type).json({ message });
  return res.status(CREATED).json(message);
};

const changedProductById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await productServices.editProduct(id, body);
  if (type) return res.status(type).json({ message });
  return res.status(OK).json({ ...body, id });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.deleteProduct(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(NO_CONTENT).json(NO_CONTENT);
};

const searchProductByname = async (req, res) => {
  const { q } = req.query;
  const { /* type, */ message } = await productServices.searchProduct(q);
  /* if (type) return res.status(type).json(message); */
  return res.status(OK).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  addProduct,
  changedProductById,
  deleteProduct,
  searchProductByname,
};
