const { salesModel } = require('../models');

const newSale = async (sale) => {
  const actualSaleID = await salesModel.actualSaleId();
  sale.forEach(async (items) => {
    await salesModel.insertSale(items, actualSaleID);
  });
  return { type: null, message: { id: actualSaleID, itemsSold: sale } };
};

module.exports = {
  newSale,
};
