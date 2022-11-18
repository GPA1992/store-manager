const { salesService } = require('../services');
const { CREATED, OK, NO_CONTENT } = require('../utils/errorMap');

const addNewSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.newSale(body);
  if (type) return res.status(type).json(message);
  console.log(message);
  res.status(CREATED).json(message);
};

const showSales = async (_req, res) => {
const { type, message } = await salesService.salesList();

  if (type) return res.status(type).json(message);

  res.status(OK).json(message);
};

const showSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.salesListById(Number(id));
  if (type) return res.status(type).json({ message });

  res.status(OK).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(NO_CONTENT).json(NO_CONTENT);
};

const attCurrentSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await salesService.attSale(body, id);
  if (type) return res.status(type).json(message);
  return res.status(OK).json(message);
};
module.exports = {
  addNewSale,
  showSales,
  showSaleById,
  deleteSale,
  attCurrentSale,
};
