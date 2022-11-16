const { salesService } = require('../services');
const { CREATED } = require('../utils/errorMap');

const addNewSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.newSale(body);
  if (type) return res.status(type).json(message);

  res.status(CREATED).json(message);
};

module.exports = {
  addNewSale,
};
