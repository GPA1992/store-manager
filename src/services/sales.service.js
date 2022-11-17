const { salesModel } = require('../models');
const { saleIdValidate } = require('./validations/sales.validate');

const newSale = async (sale) => {
  const actualSaleID = await salesModel.actualSaleId();
  sale.forEach(async (items) => {
    await salesModel.insertSale(items, actualSaleID);
  });
  return { type: null, message: { id: actualSaleID, itemsSold: sale } };
};

const salesList = async () => {
  const sales = await salesModel.getSales();
  return { type: null, message: sales };
};

const salesListById = async (saleId) => {
  const idValidate = await saleIdValidate(saleId);
  if (idValidate.type) return idValidate;
  const sale = await salesModel.salesById(saleId);
  return { type: null, message: sale };
};

module.exports = {
  newSale,
  salesList,
  salesListById,
};
