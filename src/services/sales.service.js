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

const deleteSale = async (saleId) => {
  const errorInputValue = await saleIdValidate(saleId);
  if (errorInputValue.type) return errorInputValue;
  const deleteSaleById = salesModel.deleteSaleById(saleId);
  return { type: null, message: deleteSaleById };
};

const attSale = async (saleAtt, saleId) => {
  const errorInputValue = await saleIdValidate(saleId);
  if (errorInputValue.type) return errorInputValue;

  saleAtt.forEach(async (sale) => {
    await salesModel.attSale(sale, saleId);
  });
  return { type: null, message: { saleId, itemsUpdated: saleAtt } };
};

module.exports = {
  newSale,
  salesList,
  salesListById,
  deleteSale,
  attSale,
};
