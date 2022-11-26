const { salesModel } = require('../models');
const { saleIdValidate, productValidationToNewSale } = require('./validations/sales.validate');

const newSale = async (sales) => {
  const productVerify = await productValidationToNewSale(sales);
  if (productVerify.type) return productVerify;
  const actualSaleID = await salesModel.actualSaleId();
  const addAllNewSales = sales.map((items) => salesModel.insertSale(items, actualSaleID));
  await Promise.all(addAllNewSales);
  return { type: null, message: { id: actualSaleID, itemsSold: sales } };
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
  await salesModel.deleteSaleById(saleId);
  return { type: null, message: {} };
};

const attSale = async (saleAtt, saleId) => {
  const productVerify = await productValidationToNewSale(saleAtt);
  if (productVerify.type) return productVerify;
  const errorInputValue = await saleIdValidate(saleId);
  if (errorInputValue.type) return errorInputValue;

  const attAllSales = saleAtt.map((sale) => salesModel.attSale(sale, saleId));
  await Promise.all(attAllSales);
  return { type: null, message: { saleId, itemsUpdated: saleAtt } };
};

module.exports = {
  newSale,
  salesList,
  salesListById,
  deleteSale,
  attSale,
};
