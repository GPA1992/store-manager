const { salesModel } = require('../../models');
const { NOT_FOUND } = require('../../utils/errorMap');

const saleIdValidate = async (saleId) => {
  const sale = await salesModel.salesById(saleId);
  if (sale.length === 0) return { type: NOT_FOUND, message: 'Sale not found' };
  return { type: null, message: '' };
};

module.exports = {
  saleIdValidate,
};
