const { salesService } = require('../services');
const { CREATED, OK } = require('../utils/errorMap');

const addNewSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.newSale(body);
  if (type) return res.status(type).json(message);

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
  console.log(type);
  if (type) return res.status(type).json({ message });

  res.status(OK).json(message);
};

module.exports = {
  addNewSale,
  showSales,
  showSaleById,
};
